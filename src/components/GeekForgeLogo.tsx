import React from 'react';

interface GeekForgeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showDomain?: boolean;
  variant?: 'full' | 'icon' | 'badge';
}

/**
 * GeekForge Donut Logo
 * Rebranded with the signature 3-segment vibrant donut mark:
 * - Segment 1 (Top / Yellow Gold): #FFB800 -> #F59E0B
 * - Segment 2 (Right & Bottom / Flame Orange): #FF5722 -> #EA580C
 * - Segment 3 (Bottom-Left / Electric Cyan Azure): #00A3FF -> #0284C7
 */
export const GeekForgeLogo: React.FC<GeekForgeLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  showDomain = false,
  variant = 'full',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-5xl',
  };

  const taglineSizes = {
    sm: 'text-[7px]',
    md: 'text-[8.5px]',
    lg: 'text-[10px]',
    xl: 'text-[12px]',
  };

  // Standalone Donut SVG Mark
  const DonutIcon = (
    <div
      className={`relative shrink-0 ${iconSizes[size]} transition-transform group-hover:scale-105 flex items-center justify-center`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_2px_12px_rgba(255,87,34,0.35)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Top Yellow Segment Gradient */}
          <linearGradient id="gfYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD000" />
            <stop offset="60%" stopColor="#FFB800" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* Right & Bottom Vibrant Flame Orange Gradient */}
          <linearGradient id="gfOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B22" />
            <stop offset="50%" stopColor="#FF5722" />
            <stop offset="100%" stopColor="#E64A19" />
          </linearGradient>

          {/* Bottom-Left Electric Cyan / Azure Blue Gradient */}
          <linearGradient id="gfBlueGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D2FF" />
            <stop offset="60%" stopColor="#00A3FF" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Inner Glow */}
          <filter id="gfGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Yellow Segment (Top): 10 o'clock to 12 o'clock */}
        <path
          d="M 6.17 46.17 A 44 44 0 0 1 46.93 6.11 L 48.33 26.06 A 24 24 0 0 0 26.09 47.91 Z"
          fill="url(#gfYellowGrad)"
        />

        {/* 2. Orange Segment (Right & Bottom): 12 o'clock around the right to ~7 o'clock */}
        <path
          d="M 53.07 6.11 A 44 44 0 1 1 38.61 92.50 L 43.79 73.18 A 24 24 0 1 0 51.67 26.06 Z"
          fill="url(#gfOrangeGrad)"
        />

        {/* 3. Electric Blue Segment (Bottom Left): ~7 o'clock to ~9 o'clock */}
        <path
          d="M 32.81 90.50 A 44 44 0 0 1 6.06 52.30 L 26.03 51.26 A 24 24 0 0 0 40.62 72.09 Z"
          fill="url(#gfBlueGrad)"
        />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{DonutIcon}</div>;
  }

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Signature Donut Emblem */}
      {DonutIcon}

      {/* Brand Wordmark & Slogan */}
      <div className="flex flex-col">
        <div className="flex items-center tracking-tight leading-none font-heading font-extrabold">
          <span className={`${textSizes[size]} text-slate-900 dark:text-white`}>
            Geek
          </span>
          <span className={`${textSizes[size]} text-slate-900 dark:text-white`}>
            F
          </span>
          {/* Integrated Donut O in Forge */}
          <span className="inline-block mx-0.5 relative translate-y-[0.5px]">
            <svg
              viewBox="0 0 100 100"
              className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : size === 'xl' ? 'w-7 h-7' : 'w-4 h-4'}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 6.17 46.17 A 44 44 0 0 1 46.93 6.11 L 48.33 26.06 A 24 24 0 0 0 26.09 47.91 Z"
                fill="#FFB800"
              />
              <path
                d="M 53.07 6.11 A 44 44 0 1 1 38.61 92.50 L 43.79 73.18 A 24 24 0 1 0 51.67 26.06 Z"
                fill="#FF5722"
              />
              <path
                d="M 32.81 90.50 A 44 44 0 0 1 6.06 52.30 L 26.03 51.26 A 24 24 0 0 0 40.62 72.09 Z"
                fill="#00A3FF"
              />
            </svg>
          </span>
          <span className={`${textSizes[size]} text-slate-900 dark:text-white`}>
            rge
          </span>
          {showDomain && (
            <span className="text-[10px] sm:text-xs font-bold text-[#FF5722] dark:text-[#FF7A00] ml-1 px-1.5 py-0.5 rounded-md bg-orange-500/10 border border-orange-500/20">
              .co.za
            </span>
          )}
        </div>

        {/* Tagline / Subtitle */}
        {showTagline && (
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`${taglineSizes[size]} font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FF5722] via-[#FFB800] to-[#00A3FF]`}
            >
              Web & Mobile Engineering
            </span>
            <span className="inline-flex items-center px-1 py-0.2 rounded text-[7px] font-extrabold bg-blue-500/10 text-[#00A3FF] border border-blue-500/20">
              ZA 🇿🇦
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
