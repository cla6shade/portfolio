import { type CSSProperties } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface TechStackCardProps {
  color?: string;
  title?: string;
  description?: string;
  icon?: string;
  textAutoHide?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  glowColor?: string;
  shouldDisableAnimations?: boolean;
}

export default function TechStackCard({
  color,
  title,
  description,
  icon,
  textAutoHide = true,
  enableBorderGlow = true,
  enableTilt = false,
  enableMagnetism = true,
  clickEffect = true,
  glowColor = '165, 113, 68',
  shouldDisableAnimations = false,
}: TechStackCardProps) {
  const baseClassName = `card group flex flex-col justify-between relative aspect-[4/3] min-h-[200px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] ${
    enableBorderGlow ? 'card--border-glow' : ''
  }`;

  const cardStyle = {
    backgroundColor: color || 'var(--background-dark)',
    borderColor: 'var(--border-color)',
    color: 'var(--white)',
    '--glow-x': '50%',
    '--glow-y': '50%',
    '--glow-intensity': '0',
    '--glow-radius': '200px',
  } as CSSProperties;

  return (
    <div
      className={baseClassName}
      style={cardStyle}
      ref={(el) => {
        if (!el) return;

        const handleMouseMove = (e: MouseEvent) => {
          if (shouldDisableAnimations) return;

          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          if (enableTilt) {
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            gsap.to(el, {
              rotateX,
              rotateY,
              duration: 0.1,
              ease: 'power2.out',
              transformPerspective: 1000,
            });
          }

          if (enableMagnetism) {
            const magnetX = (x - centerX) * 0.05;
            const magnetY = (y - centerY) * 0.05;

            gsap.to(el, {
              x: magnetX,
              y: magnetY,
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        };

        const handleMouseLeave = () => {
          if (shouldDisableAnimations) return;

          if (enableTilt) {
            gsap.to(el, {
              rotateX: 0,
              rotateY: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          }

          if (enableMagnetism) {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        };

        const handleClick = (e: MouseEvent) => {
          if (!clickEffect || shouldDisableAnimations) return;

          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const maxDistance = Math.max(
            Math.hypot(x, y),
            Math.hypot(x - rect.width, y),
            Math.hypot(x, y - rect.height),
            Math.hypot(x - rect.width, y - rect.height),
          );

          const ripple = document.createElement('div');
          ripple.style.cssText = `
            position: absolute;
            width: ${maxDistance * 2}px;
            height: ${maxDistance * 2}px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
            left: ${x - maxDistance}px;
            top: ${y - maxDistance}px;
            pointer-events: none;
            z-index: 1000;
          `;

          el.appendChild(ripple);

          gsap.fromTo(
            ripple,
            {
              scale: 0,
              opacity: 1,
            },
            {
              scale: 1,
              opacity: 0,
              duration: 0.8,
              ease: 'power2.out',
              onComplete: () => ripple.remove(),
            },
          );
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);
        el.addEventListener('click', handleClick);
      }}
    >
      {icon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image src={icon} alt={title || ''} width={120} height={120} />
        </div>
      )}
      <div className="card__content absolute bottom-0 left-0 right-0 flex flex-col p-5 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent">
        <h3
          className={`card__title font-normal text-base m-0 mb-1 ${textAutoHide ? 'text-clamp-1' : ''}`}
        >
          {title}
        </h3>
        <p
          className={`card__description text-xs leading-5 opacity-90 ${textAutoHide ? 'text-clamp-2' : ''}`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
