import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { useAuth } from "../../lib/auth/AuthContext";
import { apiFetch } from "../../lib/api";
import styles from "./PerfilPage.module.css";

const TAMANHO_MAX = 256;

function redimensionarImagem(arquivo: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onerror = () => reject(new Error("Não deu pra ler a imagem."));
    leitor.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Arquivo de imagem inválido."));
      img.onload = () => {
        const escala = Math.min(1, TAMANHO_MAX / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = img.width * escala;
        canvas.height = img.height * escala;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Não deu pra processar a imagem."));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = leitor.result as string;
    };
    leitor.readAsDataURL(arquivo);
  });
}

export function PerfilPage() {
  const { usuario, recarregar } = useAuth();
  const inputFotoRef = useRef<HTMLInputElement>(null);

  const [nome, setNome] = useState(usuario?.nome || "");
  const [idade, setIdade] = useState(usuario?.idade ? String(usuario.idade) : "");
  const [fotoBase64, setFotoBase64] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  if (!usuario) return <Navigate to="/entrar" state={{ de: "/perfil" }} replace />;

  async function aoEscolherFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;
    try {
      setFotoBase64(await redimensionarImagem(arquivo));
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao processar a foto.");
    }
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setOk(false);
    setSalvando(true);
    try {
      await apiFetch("/auth/perfil", {
        method: "PATCH",
        body: JSON.stringify({
          nome,
          idade: idade ? Number(idade) : null,
          fotoBase64,
        }),
      });
      setFotoBase64(null);
      await recarregar();
      setOk(true);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao salvar perfil.");
    } finally {
      setSalvando(false);
    }
  }

  const fotoAtual = fotoBase64 || usuario.foto_url;

  return (
    <div>
      <PageHeader eyebrow="Sua conta" title="Meu perfil" />

      <form onSubmit={salvar}>
        <div className={styles.foto}>
          {fotoAtual ? (
            <img src={fotoAtual} alt="" className={styles.fotoPreview} />
          ) : (
            <div className={styles.fotoIniciais}>{usuario.nome.trim().charAt(0).toUpperCase()}</div>
          )}
          <input
            ref={inputFotoRef}
            type="file"
            accept="image/*"
            onChange={aoEscolherFoto}
            style={{ display: "none" }}
          />
          <button type="button" className={styles.trocarFoto} onClick={() => inputFotoRef.current?.click()}>
            Trocar foto
          </button>
        </div>

        {ok && <p className={styles.ok}>Perfil atualizado!</p>}
        {erro && <p className={styles.erro}>{erro}</p>}

        <div className={styles.campo}>
          <label htmlFor="nome">Nome</label>
          <input id="nome" type="text" required value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className={styles.campo}>
          <label htmlFor="idade">Idade</label>
          <input
            id="idade"
            type="number"
            min={1}
            max={120}
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
        </div>

        <button className={styles.salvar} type="submit" disabled={salvando}>
          {salvando ? "Salvando…" : "Salvar"}
        </button>
      </form>
    </div>
  );
}
