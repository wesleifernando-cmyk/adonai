type Props = { size?: number; title?: string };

/** Coração em chamas com a cruz — marca do Adonai. */
export function FireMark({ size = 32, title = "Adonai" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="am-fire" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff5a2c" />
          <stop offset="0.55" stopColor="#e11d0b" />
          <stop offset="1" stopColor="#8a0f04" />
        </linearGradient>
      </defs>
      <path
        d="M24 43C11 33.6 4 25.8 4 17.6 4 11.7 8.6 7 14.3 7c3.8 0 7.2 2 9.7 5.4C26.5 9 29.9 7 33.7 7 39.4 7 44 11.7 44 17.6c0 8.2-7 16-20 25.4Z"
        fill="url(#am-fire)"
      />
      <path d="M21.6 12h4.8v22h-4.8z" fill="#f7f3ee" />
      <path d="M15 19h18v4.6H15z" fill="#f7f3ee" />
    </svg>
  );
}
