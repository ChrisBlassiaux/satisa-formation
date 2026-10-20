// Petite flèche dessinée (SVG) pour les liens « Découvrir… », à la place du caractère →.
export default function LinkArrow() {
  return (
    <svg
      className="link-arrow"
      viewBox="0 0 18 14"
      width="18"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1.5 11.5C3.5 6 7.5 3.5 15.5 4" />
      <path d="M12 1.2l3.7 2.9-3 3.4" />
    </svg>
  );
}
