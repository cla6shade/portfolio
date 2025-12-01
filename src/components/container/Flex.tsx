import { type ReactNode, ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const flexVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      col: 'flex-col',
      'col-reverse': 'flex-col-reverse',
    },
    justify: {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    align: {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
  },
});

interface FlexProps extends ComponentProps<'div'>, VariantProps<typeof flexVariants> {
  children: ReactNode;
}

export default function Flex({
  direction,
  justify,
  align,
  children,
  className,
  ...rest
}: FlexProps) {
  return (
    <div className={flexVariants({ direction, justify, align, className })} {...rest}>
      {children}
    </div>
  );
}
