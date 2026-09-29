import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../db/pool.js";

const router = Router();

function segredoJwt() {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não configurado.");
  }
  return process.env.JWT_SECRET;
}

function gerarToken(usuario) {
  return jwt.sign({ id: usuario.id, email: usuario.email }, segredoJwt(), { expiresIn: "30d" });
}

// Lê o usuário logado a partir do header Authorization: Bearer <token>.
// Não bloqueia a rota se não tiver token — quem chama decide o que fazer.
export function usuarioOpcional(req, _res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (token) {
    try {
      req.usuario = jwt.verify(token, segredoJwt());
    } catch {
      req.usuario = null;
    }
  }
  next();
}

export function exigirLogin(req, res, next) {
  usuarioOpcional(req, res, () => {
    if (!req.usuario) return res.status(401).json({ erro: "É preciso estar logado." });
    next();
  });
}

router.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !email.includes("@") || !senha || senha.length < 6) {
      return res.status(400).json({ erro: "Preencha nome, e-mail válido e senha com 6+ caracteres." });
    }

    const [existente] = await query(`SELECT id FROM usuarios WHERE email = $1`, [email]);
    if (existente) {
      return res.status(409).json({ erro: "Já existe uma conta com esse e-mail." });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const [usuario] = await query(
      `INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING id, nome, email`,
      [nome, email, senhaHash]
    );
    await query(`INSERT INTO quiz_pontuacoes (usuario_id) VALUES ($1)`, [usuario.id]);

    res.status(201).json({ token: gerarToken(usuario), usuario });
  } catch (err) {
    console.error("Erro no cadastro:", err);
    res.status(500).json({ erro: "Erro ao criar conta.", detalhe: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ erro: "Informe e-mail e senha." });
    }

    const [usuario] = await query(
      `SELECT id, nome, email, senha_hash FROM usuarios WHERE email = $1`,
      [email]
    );
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha_hash))) {
      return res.status(401).json({ erro: "E-mail ou senha incorretos." });
    }

    delete usuario.senha_hash;
    res.json({ token: gerarToken(usuario), usuario });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ erro: "Erro ao entrar.", detalhe: err.message });
  }
});

// Dados do usuário logado + se a assinatura dele está ativa (mesma
// tabela de pagamentos já usada pelo checkout, casando pelo e-mail).
router.get("/eu", exigirLogin, async (req, res) => {
  try {
    const [usuario] = await query(`SELECT id, nome, email FROM usuarios WHERE id = $1`, [req.usuario.id]);
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado." });

    const [pago] = await query(
      `SELECT id FROM pagamentos WHERE email = $1 AND status = 'aprovado' LIMIT 1`,
      [usuario.email]
    );

    res.json({ usuario, assinaturaAtiva: Boolean(pago) });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar usuário.", detalhe: err.message });
  }
});

export default router;
