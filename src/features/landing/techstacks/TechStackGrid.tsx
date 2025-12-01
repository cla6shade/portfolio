'use client';

import { useRef, useEffect, useState, type ReactNode, type RefObject } from 'react';
import GlobalSpotlight from './GlobalSpotlight';
import TechStackCard from './TechStackCard';

const MOBILE_BREAKPOINT = 768;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '165, 113, 68';

interface TechStackItem {
  color?: string;
  title?: string;
  description?: string;
  icon?: string;
}

interface TechStackGridProps {
  textAutoHide?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const techStackData: TechStackItem[] = [
  {
    color: 'oklch(0.06 0.02 59.4)',
    title: 'TypeScript',
    description: '(2024~)',
    icon: '/techstacks/typescript.svg',
  },
  {
    color: 'oklch(0.06 0.02 59.4)',
    title: 'JavaScript',
    description: '(2022 ~)',
    icon: '/techstacks/javascript.svg',
  },
  {
    color: 'oklch(0.06 0.02 59.4)',
    title: 'React',
    description: '(2023 ~)',
    icon: '/techstacks/react.svg',
  },
  {
    color: 'oklch(0.06 0.02 59.4)',
    title: 'Node.js',
    description: '(2022 ~)',
    icon: '/techstacks/nodejs.svg',
  },
  {
    color: 'oklch(0.06 0.02 59.4)',
    title: 'Next.js',
    description: '(2025 ~)',
    icon: '/techstacks/nextjs.svg',
  },
  {
    color: 'oklch(0.06 0.02 59.4)',
    title: 'MySQL',
    description: '(2023 ~)',
    icon: '/techstacks/mysql.svg',
  },
];

function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

function TechStackGridContainer({
  children,
  gridRef,
}: {
  children: ReactNode;
  gridRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      className="bento-section grid gap-2 p-3 max-w-[54rem] select-none relative"
      style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)' }}
      ref={gridRef}
    >
      {children}
    </div>
  );
}

export default function TechStackGrid({
  textAutoHide = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}: TechStackGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <>
      <style>
        {`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${glowColor};
            --border-color: oklch(0.649 0.113 59.4);
            --background-dark: oklch(0.06 0.02 59.4);
            --white: hsl(0, 0%, 100%);
            --peru-primary: oklch(0.649 0.113 59.4);
            --sandy-brown-glow: oklch(0.756 0.117 57.5 / 0.2);
            --peru-border: oklch(0.649 0.113 59.4 / 0.8);
          }

          .card-responsive {
            grid-template-columns: 1fr;
            width: 90%;
            margin: 0 auto;
            padding: 0.5rem;
          }

          @media (min-width: 600px) {
            .card-responsive {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (min-width: 1024px) {
            .card-responsive {
              grid-template-columns: repeat(4, 1fr);
            }

            .card-responsive .card:nth-child(3) {
              grid-column: span 2;
              grid-row: span 2;
            }

            .card-responsive .card:nth-child(4) {
              grid-column: 1 / span 2;
              grid-row: 2 / span 2;
            }

            .card-responsive .card:nth-child(6) {
              grid-column: 4;
              grid-row: 3;
            }
          }

          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 6px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
                rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
                transparent 60%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            transition: opacity 0.3s ease;
            z-index: 1;
          }

          .card--border-glow:hover::after {
            opacity: 1;
          }

          .card--border-glow:hover {
            box-shadow: 0 4px 20px oklch(0.649 0.113 59.4 / 0.4), 0 0 30px rgba(${glowColor}, 0.2);
          }

          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${glowColor}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }

          .particle-container:hover {
            box-shadow: 0 4px 20px oklch(0.649 0.113 59.4 / 0.2), 0 0 30px rgba(${glowColor}, 0.2);
          }

          .text-clamp-1 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .text-clamp-2 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          @media (max-width: 599px) {
            .card-responsive {
              grid-template-columns: 1fr;
              width: 90%;
              margin: 0 auto;
              padding: 0.5rem;
            }

            .card-responsive .card {
              width: 100%;
              min-height: 180px;
            }
          }
        `}
      </style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <TechStackGridContainer gridRef={gridRef}>
        <div className="card-responsive grid gap-2">
          {techStackData.map((card, index) => (
            <TechStackCard
              key={`tech-stack-card-${index}`}
              color={card.color}
              title={card.title}
              description={card.description}
              icon={card.icon}
              textAutoHide={textAutoHide}
              enableBorderGlow={enableBorderGlow}
              enableTilt={enableTilt}
              enableMagnetism={enableMagnetism}
              clickEffect={clickEffect}
              glowColor={glowColor}
              shouldDisableAnimations={shouldDisableAnimations}
            />
          ))}
        </div>
      </TechStackGridContainer>
    </>
  );
}
