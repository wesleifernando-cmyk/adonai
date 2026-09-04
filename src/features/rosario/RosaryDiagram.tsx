type Props = { destaque?: "cruz" | "conta1" | "tres" | "medalha" | "dezena" | "conta-grande" };

/** Diagrama do terço: laço com 5 dezenas + fio com medalha, 3 contas e crucifixo. */
export function RosaryDiagram({ destaque }: Props) {
  const cx = 150;
  const cyLoop = 128;
  const R = 92;

  // 5 dezenas de 10 contas pequenas + 1 conta grande entre cada dezena = 55 pontos no laço,
  // deixando uma abertura embaixo por onde desce o fio até o crucifixo.
  const pontos: { x: number; y: number; grande: boolean }[] = [];
  const porDezena = 11; // 10 pequenas + 1 grande de transição
  const total = 5 * porDezena;
  const gap = Math.PI / 4.5;
  const anguloInicial = Math.PI / 2 + gap / 2;
  const varredura = Math.PI * 2 - gap;
  for (let i = 0; i < total; i++) {
    const t = i / (total - 1);
    const ang = anguloInicial + t * varredura;
    pontos.push({
      x: cx + R * Math.cos(ang),
      y: cyLoop + R * Math.sin(ang),
      grande: i % porDezena === 0,
    });
  }

  const cor = (parte: Props["destaque"]) =>
    destaque === parte ? "var(--fire-bright)" : "var(--text-mute)";

  return (
    <svg viewBox="0 0 300 400" width="100%" role="img" aria-label="Diagrama do terço de cinco dezenas">
      {/* laço */}
      <polyline
        points={pontos.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="var(--hairline)"
        strokeWidth="1.5"
      />
      {pontos.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.grande ? 6 : 4}
          fill={p.grande ? cor("conta-grande") : cor("dezena")}
        />
      ))}

      {/* fio descendo do laço */}
      <line x1={cx} y1={cyLoop + R} x2={cx} y2="360" stroke="var(--hairline)" strokeWidth="1.5" />

      {/* medalha */}
      <circle cx={cx} cy="235" r="9" fill="none" stroke={cor("medalha")} strokeWidth="2" />

      {/* 3 contas (Ave-Marias) */}
      {[258, 275, 292].map((y, i) => (
        <circle key={i} cx={cx} cy={y} r="6" fill={cor("tres")} />
      ))}

      {/* conta do Pai-Nosso antes da 1ª dezena */}
      <circle cx={cx} cy="315" r="7" fill={cor("conta1")} />

      {/* crucifixo */}
      <g stroke={cor("cruz")} strokeWidth="4" strokeLinecap="round">
        <line x1={cx} y1="330" x2={cx} y2="358" />
        <line x1={cx - 11} y1="340" x2={cx + 11} y2="340" />
      </g>
    </svg>
  );
}
