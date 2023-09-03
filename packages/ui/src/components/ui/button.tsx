import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center rounded-md font-serif font-bold transition-colors ring-offset-background active:top-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink/75 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        cyan: 'text-black/50 bg-cyan hover:bg-cyan/80 active:bg-cyan/60',
        green: 'text-black/50 bg-green hover:bg-green/80 active:bg-green/60',
        orange:
          'text-black/50 bg-orange hover:bg-orange/80 active:bg-orange/60',
        pink: 'text-black/50 bg-pink hover:bg-pink/80 active:bg-pink/60',
        purple:
          'text-black/50 bg-purple hover:bg-purple/80 active:bg-purple/60',
        red: 'bg-red hover:bg-red/80 active:bg-red/60',
        yellow:
          'text-black/50 bg-yellow hover:bg-yellow/80 active:bg-yellow/60',
        outline: 'border-[3px] border-purple hover:bg-muted active:bg-muted/60',
        ghost: 'font-sans hover:bg-muted active:bg-muted/60',
        link: 'text-purple underline-offset-4 hover:underline hover:text-purple/80 active:text-purple/60',
      },
      size: {
        sm: 'h-9 text-xs px-3 rounded-md',
        md: 'h-10 text-sm py-2 px-4',
        lg: 'h-11 text-xl px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'purple',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
