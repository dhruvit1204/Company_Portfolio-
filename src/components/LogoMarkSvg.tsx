import React from 'react';

interface LogoMarkSvgProps {
  className?: string;
  eRef?: React.Ref<SVGGElement>;
  slashRef?: React.Ref<SVGGElement>;
  variant?: 'silver' | 'solid';
}

/**
 * Split Vector SVG for Exception IT Solutions Brand Mark (E/.)
 * Allows independent GSAP animation of the 'E' blades and the '/.' slash & dot.
 */
export const LogoMarkSvg: React.FC<LogoMarkSvgProps> = ({
  className = 'w-36 h-36',
  eRef,
  slashRef,
  variant = 'silver',
}) => {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} overflow-visible`}
      aria-label="Exception IT Solutions Mark"
    >
      <defs>
        {/* Luxury Metallic Silver Gradient */}
        <linearGradient id="silverSheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="35%" stopColor="#E2E6EC" />
          <stop offset="65%" stopColor="#B4BDCB" />
          <stop offset="100%" stopColor="#D5DBE5" />
        </linearGradient>

        {/* Specular Highlight Filter */}
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Part 1: Stylized 'E' (3 Engineering Blades) */}
      <g
        ref={eRef}
        id="logo-part-e"
        fill={variant === 'silver' ? 'url(#silverSheen)' : 'currentColor'}
        className="will-change-transform"
      >
        {/* Top Blade */}
        <path d="M 15 36 L 160 36 L 136 71 L 0 71 L 0 51 C 0 42.7 6.7 36 15 36 Z" />
        {/* Middle Blade */}
        <path d="M 0 105 L 117 105 L 94 140 L 0 140 Z" />
        {/* Bottom Blade */}
        <path d="M 0 185 L 68 185 L 45 219 L 15 219 C 6.7 219 0 212.3 0 204 L 0 185 Z" />
      </g>

      {/* Part 2: Stylized '/.' (Forward Slash and Terminal Dot) */}
      <g
        ref={slashRef}
        id="logo-part-slash"
        fill={variant === 'silver' ? 'url(#silverSheen)' : 'currentColor'}
        className="will-change-transform"
      >
        {/* Forward Slash */}
        <path d="M 213 36 L 255 36 L 132 219 L 90 219 Z" />
        {/* Terminal Dot */}
        <rect x="175" y="189" width="30" height="30" rx="3" />
      </g>
    </svg>
  );
};
