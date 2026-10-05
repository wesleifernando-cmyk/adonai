import { useEffect, useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { apiFetch } from "../../lib/api";
import { useAuth } from "../../lib/auth/AuthContext";
import { dataCurta, textoDiasRestantes } from "../../lib/dates";
import styles from "./AdminPage.module.css";

type UsuarioAdmin = {
  id: number;
  nome: string;
  email: string;
  admin: boolean;
  bloqueado: boolean;
  assinatura_ativa: boolean;
  assinatura_status: "pending" | "authorized" | "paused" | "cancelled" | null;
  acesso_tipo: "cartao" | "avulso" | "sem_vencimento" | null;
  valido_ate: string | null;
  dias_restantes: number | null;
  venceu_em: string | null;
  ultimo_pagamento_em: string | null;
  criado_em: string;
};

const ROTULO_STATUS: Record<string, string> = {
  authorized: "assinatura ativa",
  pending: "aguardando pagamento",
  paused: "assinatura pausada",
  cancelled: "assinatura cancelada",
};

export function AdminPage() {
  const { usuario: euMesmo } = useAuth();
  const [usuarios, setUsuarios] = useState<UsuarioAdmin[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [emAcao, setEmAcao] = useState<number | null>(null);
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState<"todos" | "vencendo" | "sem">("todos");

  async function carregar() {
    try {
      const dados = await apiFetch<{ usuarios: UsuarioAdmin[] }>("/admin/usuarios");
      setUsuarios(dados.usuarios);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao carregar usuários.");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function executar(id: number, acao: string, corpo?: Record<string, unknown>) {
    setErro(null);
    setEmAcao(id);
    try {
      await apiFetch(`/admin/usuarios/${id}/${acao}`, {
        method: "POST",
        ...(corpo ? { body: JSON.stringify(corpo) } : {}),
      });
      await carregar();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao executar ação.");
    } finally {
      setEmAcao(null);
    }
  }

  if (erro && !usuarios) {
    return (
      <div>
        <PageHeader eyebrow="Administração" title="Controle de usuários" />
        <p className={styles.erro}>{erro}</p>
      </div>
    );
  }

  if (!usuarios) {
    return (
      <div>
        <PageHeader eyebrow="Administração" title="Controle de usuários" />
        <p>Carregando…</p>
      </div>
    );
  }

  const total = usuarios.length;
  const pagando = usuarios.filter((u) => u.assinatura_ativa).length;
  const semPagar = total - pagando;
  const vencendo = usuarios.filter((u) => u.acesso_tipo === "avulso" && (u.dias_restantes ?? 99) <= 5).length;

  const termo = busca.trim().toLowerCase();
  const visiveis = usuarios.filter((u) => {
    if (termo && !u.nome.toLowerCase().includes(termo) && !u.email.toLowerCase().includes(termo)) return false;
    if (filtro === "vencendo") return u.acesso_tipo === "avulso" && (u.dias_restantes ?? 99) <= 5;
    if (filtro === "sem") return !u.assinatura_ativa;
    return true;
  });

  return (
    <div>
      <PageHeader eyebrow="Administração" title="Controle de usuários" />

      {erro && <p className={styles.erro}>{erro}</p>}

      <div className={styles.resumo}>
        <div className={styles.stat}>
          <p className={styles.statNum}>{total}</p>
          <p className={styles.statLabel}>Usuários</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statNum}>{pagando}</p>
          <p className={styles.statLabel}>Pagando</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statNum}>{semPagar}</p>
          <p className={styles.statLabel}>Sem pagar</p>
        </div>
      </div>

      <input
        type="search"
        className={styles.busca}
        placeholder="Buscar por e-mail ou nome…"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        autoCapitalize="none"
        autoCorrect="off"
      />
      <div className={styles.filtros}>
        {([
          ["todos", `Todos (${total})`],
          ["sem", `Sem acesso (${semPagar})`],
          ["vencendo", `Vencendo em 5 dias (${vencendo})`],
        ] as const).map(([chave, rotulo]) => (
          <button
            key={chave}
            className={`${styles.filtro} ${filtro === chave ? styles.filtroAtivo : ""}`}
            onClick={() => setFiltro(chave)}
          >
            {rotulo}
          </button>
        ))}
      </div>
      {visiveis.length === 0 && <p className={styles.vazio}>Ninguém encontrado.</p>}

      <div className={styles.tabela}>
        {visiveis.map((u) => (
          <div key={u.id} className={`${styles.linha} ${u.bloqueado ? styles.bloqueado : ""}`}>
            <div className={styles.topo}>
              <div>
                <p className={styles.nome}>{u.nome}</p>
                <p className={styles.email}>{u.email}</p>
              </div>
              <div className={styles.selos}>
                {u.admin && <span className={`${styles.selo} ${styles.seloAdmin}`}>admin</span>}
                {u.bloqueado && <span className={`${styles.selo} ${styles.seloBloqueado}`}>bloqueado</span>}
                <span className={`${styles.selo} ${u.assinatura_ativa ? styles.seloOk : styles.seloNao}`}>
                  {u.acesso_tipo === "cartao"
                    ? "cartão · mensal"
                    : u.acesso_tipo === "sem_vencimento"
                      ? "sem vencimento"
                      : u.acesso_tipo === "avulso"
                        ? "pago · 30 dias"
                        : "sem acesso"}
                </span>
                {u.assinatura_status && u.assinatura_status !== "authorized" && (
                  <span className={`${styles.selo} ${styles.seloNao}`}>{ROTULO_STATUS[u.assinatura_status]}</span>
                )}
              </div>
            </div>

            <p className={styles.prazo}>
              {u.acesso_tipo === "avulso" && u.valido_ate && (
                <>
                  Acesso até <strong>{dataCurta(u.valido_ate)}</strong> ·{" "}
                  <span className={(u.dias_restantes ?? 99) <= 5 ? styles.prazoAlerta : ""}>
                    {textoDiasRestantes(u.dias_restantes ?? 0)}
                  </span>
                </>
              )}
              {u.acesso_tipo === "cartao" && "Assinatura no cartão, renova sozinha todo mês"}
              {u.acesso_tipo === "sem_vencimento" && "Liberado sem data de vencimento"}
              {!u.acesso_tipo && u.venceu_em && (
                <span className={styles.prazoAlerta}>Venceu em {dataCurta(u.venceu_em)}</span>
              )}
              {!u.acesso_tipo && !u.venceu_em && "Nunca teve acesso"}
              {u.ultimo_pagamento_em && <> · último pagamento em {dataCurta(u.ultimo_pagamento_em)}</>}
            </p>

            <div className={styles.acoes}>
              {u.acesso_tipo !== "cartao" && (
                <button
                  className={`${styles.botao} ${styles.botaoFogo}`}
                  disabled={emAcao === u.id}
                  onClick={() => {
                    if (window.confirm(`Liberar 30 dias para ${u.nome} (pagou R$ 5,99 por fora)?`)) {
                      executar(u.id, "liberar", { dias: 30, pago: true });
                    }
                  }}
                >
                  {u.acesso_tipo === "avulso" ? "+30 dias (pagou Pix)" : "Liberar 30 dias (pagou Pix)"}
                </button>
              )}
              {!u.assinatura_ativa && (
                <button
                  className={styles.botao}
                  disabled={emAcao === u.id}
                  onClick={() => {
                    if (window.confirm(`Liberar ${u.nome} de graça, sem vencimento?`)) {
                      executar(u.id, "liberar", { dias: null });
                    }
                  }}
                >
                  Liberar de graça (sem prazo)
                </button>
              )}
              {u.bloqueado ? (
                <button className={styles.botao} disabled={emAcao === u.id} onClick={() => executar(u.id, "desbloquear")}>
                  Desbloquear
                </button>
              ) : (
                u.id !== euMesmo?.id && (
                  <button
                    className={`${styles.botao} ${styles.botaoPerigo}`}
                    disabled={emAcao === u.id}
                    onClick={() => executar(u.id, "bloquear")}
                  >
                    Bloquear
                  </button>
                )
              )}
              {u.admin ? (
                u.id !== euMesmo?.id && (
                  <button className={styles.botao} disabled={emAcao === u.id} onClick={() => executar(u.id, "remover-admin")}>
                    Remover admin
                  </button>
                )
              ) : (
                <button className={styles.botao} disabled={emAcao === u.id} onClick={() => executar(u.id, "tornar-admin")}>
                  Tornar admin
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
