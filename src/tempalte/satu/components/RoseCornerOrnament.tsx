
// --- Luxury Rose Corner Ornament SVG ---
const RoseCornerOrnament = ({
  className = 'w-12 h-12',
  color = '#82694D',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Rose Corner Core */}
    <g transform="translate(24, 24)">
      <path
        d="M-2,-2 C-1,-4 3,-4 4,-2 C5,0 3,3 0,4 C-3,4 -5,1 -5,-2 C-5,-6 2,-7 5,-4 C9,-2 9,4 5,7 C1,9 -4,9 -7,5"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M-7,-3 C-12,-8 -3,-13 3,-12 C10,-11 13,-5 10,2"
        stroke={color}
        strokeWidth="1.1"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M9,2 C13,8 8,15 1,15 C-6,15 -13,10 -9,2"
        stroke={color}
        strokeWidth="1.1"
        fill="none"
        opacity="0.7"
      />
      {/* Corner Leaves */}
      <path
        d="M-5,-11 C-13,-13 -15,-7 -11,-4 C-7,-5 -6,-9 -5,-11 Z"
        fill={color}
        opacity="0.65"
      />
      <path
        d="M11,2 C16,1 18,8 14,10 C11,8 10,5 11,2 Z"
        fill={color}
        opacity="0.65"
      />
    </g>
    {/* Delicate Border Bracket */}
    <path
      d="M6,6 L6,50 C6,38 12,26 20,18 C28,10 40,6 52,6 L6,6 Z"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.45"
    />
    <circle cx="6" cy="6" r="2.2" fill={color} opacity="0.8" />
  </svg>
);

export default RoseCornerOrnament;
