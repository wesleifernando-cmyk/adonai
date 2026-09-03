import markUrl from "../../assets/adonai-mark.png";
import logoUrl from "../../assets/adonai-logo.png";

/* A arte tem fundo preto puro (#000); "screen" funde esse preto com o
   fundo quase-preto do app e o quadrado some, deixando só a chama. */
const blend: React.CSSProperties = { mixBlendMode: "screen" };

/** Só o coração em chamas com a cruz (sem a palavra). */
export function BrandMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <img
      src={markUrl}
      width={size}
      height={size}
      alt="Adonai"
      className={className}
      style={{ display: "block", ...blend }}
      draggable={false}
    />
  );
}

/** Arte completa do Adonai (coração + palavra). */
export function BrandLogo({ width = 200, className }: { width?: number; className?: string }) {
  return (
    <img
      src={logoUrl}
      width={width}
      alt="Adonai"
      className={className}
      style={{ display: "block", height: "auto", ...blend }}
      draggable={false}
    />
  );
}

export { markUrl, logoUrl };
