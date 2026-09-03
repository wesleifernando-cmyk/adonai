/** Ícone simples de igreja — usado como selo católico discreto. */
export function ChurchMark({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2v4M10 4h4" />
      <path d="M12 6 5 10v11h14V10l-7-4Z" />
      <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
      <path d="M5 13H2v8h3M19 13h3v8h-3" />
    </svg>
  );
}
