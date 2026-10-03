export type Foto = { src: string; thumb: string };

const NUM_FOTOS_DESPERTA = 68;

export const capaDesperta = { src: "/desperta/capa.jpg", thumb: "/desperta/capa-thumb.jpg" };

/** Fotos do Retiro Desperta — arquivos em public/desperta (grande) e public/desperta/thumbs (miniatura). */
export const fotosDesperta: Foto[] = Array.from({ length: NUM_FOTOS_DESPERTA }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { src: `/desperta/foto-${n}.jpg`, thumb: `/desperta/thumbs/foto-${n}.jpg` };
});
