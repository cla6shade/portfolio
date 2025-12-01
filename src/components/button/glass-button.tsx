import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { type MouseEvent } from 'react';

import { cn } from '@/lib/utils';
import GlassSurface, { type GlassSurfaceProps } from '@/components/react-bits/GlassSurface';

const glassButtonVariants = cva(
  'inline-flex items-center ' +
    'justify-center gap-2 whitespace-nowrap rounded-md text-sm ' +
    'font-medium transition-all disabled:pointer-events-none disabled:opacity-50 ' +
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 " +
    'outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] ' +
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ',
  {
    variants: {
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

interface GlassButtonProps extends GlassSurfaceProps, VariantProps<typeof glassButtonVariants> {
  asChild?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

function GlassButton({
  className,
  size,
  asChild = false,
  onClick,
  disabled,
  type = 'button',
  children,
  ...glassProps
}: GlassButtonProps) {
  const Comp = asChild ? Slot : 'button';

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { height: 32 };
      case 'lg':
        return { height: 40 };
      case 'icon':
        return { width: 36, height: 36 };
      case 'icon-sm':
        return { width: 32, height: 32 };
      case 'icon-lg':
        return { width: 40, height: 40 };
      default:
        return { height: 36 };
    }
  };

  const sizeStyles = getSizeStyles();
  const isIcon = size === 'icon' || size === 'icon-sm' || size === 'icon-lg';

  return (
    <GlassSurface
      width={isIcon ? sizeStyles.width : 'auto'}
      height={sizeStyles.height}
      {...glassProps}
      style={{
        ...glassProps.style,
        width: isIcon ? `${sizeStyles.width}px` : 'fit-content',
      }}
    >
      <Comp
        type={type}
        data-slot="glass-button"
        className={cn(glassButtonVariants({ size, className }))}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Comp>
    </GlassSurface>
  );
}

export { GlassButton, glassButtonVariants };
