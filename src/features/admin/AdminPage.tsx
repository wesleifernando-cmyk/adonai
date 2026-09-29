import { useEffect, useState } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { apiFetch } from "../../lib/api";
import { useAuth } from "../../lib/auth/AuthContext";
import styles from "./AdminPage.module.css";

type UsuarioAdmin = {
  id: number;
  nome: string;
  email: string;
  admin: boolean;
  bloqueado: boolean;
  assinatura_ativa: boolean;
  criado_em: string;
};

export function AdminPage() {
  const { usuario: euMesmo } = useAuth();
  const [usuarios, setUsuarios] = useState<UsuarioAdmin[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [emAcao, setEmAcao] = useState<number | null>(null);

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

  async function executar(id: number, acao: string) {
    setErro(null);
    setEmAcao(id);
    try {
      await apiFetch(`/admin/usuarios/${id}/${acao}`, { method: "POST" });
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

      <div className={styles.tabela}>
        {usuarios.map((u) => (
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
                  {u.assinatura_ativa ? "pagando" : "sem pagar"}
                </span>
              </div>
            </div>

            <div className={styles.acoes}>
              {!u.assinatura_ativa && (
                <button
                  className={`${styles.botao} ${styles.botaoFogo}`}
                  disabled={emAcao === u.id}
                  onClick={() => executar(u.id, "liberar")}
                >
                  Liberar acesso de graça
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
