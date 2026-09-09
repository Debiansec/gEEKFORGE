import React from 'react';

interface GeekForgeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showDomain?: boolean;
  variant?: 'full' | 'icon' | 'badge';
}

export const GeekForgeLogo: React.FC<GeekForgeLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  showDomain = false,
  variant = 'full',
}) => {
  // Dimension mappings
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
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

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* 3D Stylized GF Neon Monogram Emblem */}
      <div
        className={`relative shrink-0 ${iconSizes[size]} rounded-2xl p-0.5 bg-gradient-to-br from-[#00A3FF] via-[#4F46E5] to-[#A855F7] shadow-lg shadow-blue-500/25 dark:shadow-purple-500/30 group-hover:scale-105 transition-transform flex items-center justify-center overflow-hidden`}
      >
        <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center relative overflow-hidden">
          {/* Subtle internal neon backlights */}
          <div className="absolute -top-1 -left-1 w-6 h-6 bg-[#00A3FF]/40 rounded-full blur-xs pointer-events-none" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#A855F7]/40 rounded-full blur-xs pointer-events-none" />

          {/* SVG Vector Monogram GF mirroring attached logo */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full p-1 drop-shadow-[0_2px_8px_rgba(0,163,255,0.4)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Neon Blue Metallic Gradient for G */}
              <linearGradient id="neonBlueG" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="30%" stopColor="#00A3FF" />
                <stop offset="70%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>

              {/* Neon Purple Metallic Gradient for F */}
              <linearGradient id="neonPurpleF" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E879F9" />
                <stop offset="30%" stopColor="#C084FC" />
                <stop offset="70%" stopColor="#9333EA" />
                <stop offset="100%" stopColor="#6B21A8" />
              </linearGradient>

              {/* Beveled Highlights */}
              <linearGradient id="glowG" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0.1" />
              </linearGradient>

              <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Letter 'G' in Neon Electric Blue with 3D bevel */}
            <path
              d="M 48 20 C 30 20 16 33 16 51 C 16 69 30 82 48 82 C 60 82 70 75 75 65 L 61 65 C 57 70 53 72 48 72 C 36 72 26 62 26 51 C 26 40 36 30 48 30 C 56 30 63 34 66 40 L 76 33 C 70 25 60 20 48 20 Z"
              fill="url(#neonBlueG)"
            />
            {/* G crossbar & bevel */}
            <path
              d="M 46 45 L 72 45 L 72 57 L 58 57 L 58 52 L 46 52 Z"
              fill="url(#neonBlueG)"
            />
            <path
              d="M 48 22 C 32 22 18 35 18 51 C 18 67 32 80 48 80 C 58 80 67 74 72 65 L 68 65 C 64 71 56 75 48 75 C 34 75 22 64 22 51 C 22 38 34 27 48 27 C 54 27 61 30 65 35 L 68 32 C 63 26 56 22 48 22 Z"
              stroke="url(#glowG)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.9"
            />

            {/* Letter 'F' in Neon Electric Purple with 3D bevel interlocking */}
            <path
              d="M 52 26 L 86 26 C 88 26 89 28 88 30 L 84 36 C 83 37 82 38 80 38 L 64 38 L 64 47 L 78 47 C 80 47 81 48 80 50 L 77 56 C 76 57 75 58 73 58 L 64 58 L 64 80 C 64 82 62 84 60 84 L 54 84 C 53 84 52 82 52 80 Z"
              fill="url(#neonPurpleF)"
            />
            {/* Highlight ridge on F */}
            <path
              d="M 54 28 L 84 28 L 81 33 L 66 33 L 66 49 L 76 49 L 74 54 L 66 54 L 66 80 L 54 80 Z"
              stroke="#F5D0FE"
              strokeWidth="1"
              fill="none"
              opacity="0.8"
            />
          </svg>
        </div>
      </div>

      {/* Typography: GEEK in Neon Blue, FORGE in Neon Purple */}
      {variant !== 'icon' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-heading font-black tracking-tight ${textSizes[size]}`}
            >
              <span className="text-[#00A3FF] drop-shadow-[0_0_12px_rgba(0,163,255,0.4)]">
                GEEK
              </span>
              <span className="text-[#C084FC] dark:text-[#D8B4FE] drop-shadow-[0_0_12px_rgba(192,132,252,0.4)]">
                FORGE
              </span>
            </span>

            {showDomain && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-500/10 dark:bg-purple-500/20 text-blue-600 dark:text-purple-300 border border-blue-500/20 dark:border-purple-500/30">
                .co.za
              </span>
            )}
          </div>

          {/* Subtitle / Tagline from Logo: BUILD. GROW. DOMINATE ONLINE. */}
          {showTagline && (
            <div className="flex items-center gap-1.5 mt-1">
              <div className="h-px w-2 sm:w-3 bg-gradient-to-r from-[#00A3FF] to-transparent opacity-70" />
              <span
                className={`font-semibold tracking-[0.16em] uppercase text-slate-500 dark:text-slate-400 ${taglineSizes[size]}`}
              >
                BUILD. GROW. DOMINATE ONLINE.
              </span>
              <div className="h-px w-2 sm:w-3 bg-gradient-to-l from-[#C084FC] to-transparent opacity-70" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
