
// --- Luxury Rose Floral Divider SVG ---
export const RoseFloralDivider = ({
  className = 'w-44 h-8',
  color = '#82694D',
}: {
  className?: string;
  color?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 320 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Center Rose Blossom */}
    <g transform="translate(160, 30)">
      {/* Rose Center Petal Spiral Core */}
      <path
        d="M-2,-3 C0,-6 4,-5 5,-3 C6,-1 4,3 1,4 C-3,5 -6,2 -6,-2 C-6,-7 2,-8 7,-6 C12,-3 12,6 7,10 C1,14 -8,13 -12,7 C-16,1 -14,-10 -6,-14 C3,-18 15,-15 19,-7 C23,2 19,16 11,20 C3,24 -11,23 -17,15"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      {/* Outer Layering Petals */}
      <path
        d="M-12,-5 C-19,-12 -6,-20 4,-19 C15,-18 20,-8 15,3"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M14,3 C20,11 11,22 0,22 C-11,22 -22,14 -16,3"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M-16,0 C-24,3 -23,-11 -13,-16"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      {/* Rose Sepals / Calyx Base */}
      <path
        d="M-5,18 C-8,24 -14,25 -18,22 C-14,20 -10,18 -5,18 Z"
        fill={color}
        opacity="0.7"
      />
      <path
        d="M5,18 C8,24 14,25 18,22 C14,20 10,18 5,18 Z"
        fill={color}
        opacity="0.7"
      />
      <path
        d="M0,20 C0,27 3,31 0,34 C-3,31 0,27 0,20 Z"
        fill={color}
        opacity="0.75"
      />
    </g>

    {/* Left Flourish Arm */}
    <g>
      {/* Main horizontal flowing scroll line */}
      <path
        d="M136,30 C118,30 108,21 92,23 C76,25 62,35 44,32 C28,29 14,30 2,30"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* Counter-swirl flourish */}
      <path
        d="M92,23 C84,17 75,18 69,22 C63,26 54,28 44,32"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* Left Rose Leaf 1 */}
      <path
        d="M122,29 C115,19 104,18 100,24 C108,28 116,29 122,29 Z"
        fill={color}
        opacity="0.65"
      />
      {/* Left Rose Leaf 2 */}
      <path
        d="M82,24 C75,33 64,34 60,28 C67,23 75,23 82,24 Z"
        fill={color}
        opacity="0.6"
      />
      {/* Left Rosebud */}
      <g transform="translate(68, 20) scale(0.75)">
        <path
          d="M0,0 C-4,-8 4,-10 6,-5 C8,0 4,6 0,8 C-4,6 -6,1 0,0 Z"
          fill={color}
          opacity="0.75"
        />
        <path
          d="M-3,8 C-5,13 -1,16 0,18 C1,16 5,13 3,8"
          stroke={color}
          strokeWidth="1.3"
          fill="none"
          opacity="0.65"
        />
      </g>
      {/* Left Terminal Scroll & Pearl Dots */}
      <circle cx="2" cy="30" r="2.2" fill={color} opacity="0.8" />
      <circle cx="36" cy="30" r="1.5" fill={color} opacity="0.55" />
    </g>

    {/* Right Flourish Arm (Symmetrical Mirror) */}
    <g transform="translate(320, 0) scale(-1, 1)">
      {/* Main horizontal flowing scroll line */}
      <path
        d="M136,30 C118,30 108,21 92,23 C76,25 62,35 44,32 C28,29 14,30 2,30"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* Counter-swirl flourish */}
      <path
        d="M92,23 C84,17 75,18 69,22 C63,26 54,28 44,32"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* Right Rose Leaf 1 */}
      <path
        d="M122,29 C115,19 104,18 100,24 C108,28 116,29 122,29 Z"
        fill={color}
        opacity="0.65"
      />
      {/* Right Rose Leaf 2 */}
      <path
        d="M82,24 C75,33 64,34 60,28 C67,23 75,23 82,24 Z"
        fill={color}
        opacity="0.6"
      />
      {/* Right Rosebud */}
      <g transform="translate(68, 20) scale(0.75)">
        <path
          d="M0,0 C-4,-8 4,-10 6,-5 C8,0 4,6 0,8 C-4,6 -6,1 0,0 Z"
          fill={color}
          opacity="0.75"
        />
        <path
          d="M-3,8 C-5,13 -1,16 0,18 C1,16 5,13 3,8"
          stroke={color}
          strokeWidth="1.3"
          fill="none"
          opacity="0.65"
        />
      </g>
      {/* Right Terminal Scroll & Pearl Dots */}
      <circle cx="2" cy="30" r="2.2" fill={color} opacity="0.8" />
      <circle cx="36" cy="30" r="1.5" fill={color} opacity="0.55" />
    </g>
  </svg>
);

// Alias BotanicalBranch for backwards compatibility
export const BotanicalBranch = RoseFloralDivider;

export default RoseFloralDivider;
