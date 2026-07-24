import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon';
  theme?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'light',
  className = '',
}) => {
  // Brand color definitions
  const blue = '#00296b';
  const gold = '#e8c47a';

  // Theme-specific colors
  const textPrimary = theme === 'dark' ? gold : blue;
  const lineStroke = gold;
  const textSubtitle = theme === 'dark' ? '#ffffff' : blue;

  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Graduation Cap */}
        <g id="graduation-cap">
          {/* Cap Skull Underneath */}
          <path
            d="M 32,18 L 32,23 C 32,28 68,28 68,23 L 68,18 Z"
            fill={gold}
          />
          {/* Cap Board */}
          <path
            d="M 50,4 L 88,13 L 50,22 L 12,13 Z"
            fill={gold}
          />
          {/* Tassel Button & String */}
          <path
            d="M 50,13 L 78,16 L 78,28"
            stroke={gold}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Tassel Tip */}
          <path
            d="M 76,28 L 80,28 L 80,34 L 76,34 Z"
            fill={gold}
          />
        </g>

        {/* Shield */}
        <g id="shield">
          {/* Top-Left Quadrant: Gold bg, Blue 'I' */}
          <path
            d="M 12,32 L 50,32 L 50,74 L 12,74 Z"
            fill={gold}
          />
          <text
            x="31"
            y="56"
            fill={blue}
            fontFamily="Georgia, serif"
            fontWeight="bold"
            fontSize="22"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            I
          </text>

          {/* Top-Right Quadrant: Blue bg, Gold 'R' */}
          <path
            d="M 50,32 L 88,32 L 88,74 L 50,74 Z"
            fill={blue}
          />
          <text
            x="69"
            y="56"
            fill={gold}
            fontFamily="Georgia, serif"
            fontWeight="bold"
            fontSize="22"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            R
          </text>

          {/* Bottom-Left Quadrant: Blue bg, Gold 'P' */}
          <path
            d="M 12,74 L 50,74 L 50,116 C 30,116 12,96 12,74 Z"
            fill={blue}
          />
          <text
            x="31"
            y="90"
            fill={gold}
            fontFamily="Georgia, serif"
            fontWeight="bold"
            fontSize="22"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            P
          </text>

          {/* Bottom-Right Quadrant: Gold bg, Blue 'S' */}
          <path
            d="M 50,74 L 88,74 C 88,96 70,116 50,116 Z"
            fill={gold}
          />
          <text
            x="69"
            y="90"
            fill={blue}
            fontFamily="Georgia, serif"
            fontWeight="bold"
            fontSize="22"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            S
          </text>

          {/* Shield Gold Border Outline */}
          <path
            d="M 12,32 L 88,32 L 88,74 C 88,96 70,116 50,116 C 30,116 12,96 12,74 Z"
            stroke={gold}
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
    );
  }

  // Variant: full (Shield + Text branding)
  return (
    <svg
      viewBox="0 0 540 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield symbol group shifted left */}
      <g transform="translate(0, 0)">
        {/* Graduation Cap */}
        <g id="graduation-cap">
          <path
            d="M 32,18 L 32,23 C 32,28 68,28 68,23 L 68,18 Z"
            fill={gold}
          />
          <path
            d="M 50,4 L 88,13 L 50,22 L 12,13 Z"
            fill={gold}
          />
          <path
            d="M 50,13 L 78,16 L 78,28"
            stroke={gold}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 76,28 L 80,28 L 80,34 L 76,34 Z"
            fill={gold}
          />
        </g>

        {/* Shield */}
        <g id="shield">
          <path
            d="M 12,32 L 50,32 L 50,74 L 12,74 Z"
            fill={gold}
          />
          <text
            x="31"
            y="56"
            fill={blue}
            fontFamily="Georgia, serif"
            fontWeight="bold"
            fontSize="22"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            I
          </text>

          <path
            d="M 50,32 L 88,32 L 88,74 L 50,74 Z"
            fill={blue}
          />
          <text
            x="69"
            y="56"
            fill={gold}
            fontFamily="Georgia, serif"
            fontWeight="bold"
            fontSize="22"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            R
          </text>

          <path
            d="M 12,74 L 50,74 L 50,116 C 30,116 12,96 12,74 Z"
            fill={blue}
          />
          <text
            x="31"
            y="90"
            fill={gold}
            fontFamily="Georgia, serif"
            fontWeight="bold"
            fontSize="22"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            P
          </text>

          <path
            d="M 50,74 L 88,74 C 88,96 70,116 50,116 Z"
            fill={gold}
          />
          <text
            x="69"
            y="90"
            fill={blue}
            fontFamily="Georgia, serif"
            fontWeight="bold"
            fontSize="22"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            S
          </text>

          <path
            d="M 12,32 L 88,32 L 88,74 C 88,96 70,116 50,116 C 30,116 12,96 12,74 Z"
            stroke={gold}
            strokeWidth="3.5"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>

      {/* Brand Text Name group */}
      <g transform="translate(108, 0)">
        {/* Main Title: IRPS */}
        <text
          x="0"
          y="64"
          fill={textPrimary}
          fontFamily="Georgia, serif"
          fontSize="56"
          fontWeight="bold"
          letterSpacing="0.05em"
        >
          IRPS
        </text>

        {/* Separator Line */}
        <line
          x1="0"
          y1="78"
          x2="420"
          y2="78"
          stroke={lineStroke}
          strokeWidth="1.5"
        />

        {/* Subtitle */}
        <text
          x="0"
          y="98"
          fill={textSubtitle}
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="13.5"
          fontWeight="bold"
          letterSpacing="0.16em"
        >
          INSTITUTE OF RESEARCH AND POLICY STUDIES
        </text>
      </g>
    </svg>
  );
};
