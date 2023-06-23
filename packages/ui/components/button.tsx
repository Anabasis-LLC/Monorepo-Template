import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from './cn';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center rounded-md font-serif font-bold transition-colors ring-offset-background active:top-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink/75 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'text-black/50 bg-primary hover:bg-primary/80 active:bg-primary/60',
        secondary:
          'text-black/50 bg-secondary hover:bg-secondary/80 active:bg-secondary/60',
        outline:
          'border border-purple/50 hover:text-accent-foreground hover:bg-accent active:bg-accent/60',
        ghost:
          'font-sans hover:text-accent-foreground hover:bg-accent active:bg-accent/60',
        link: 'text-primary underline-offset-4 hover:underline hover:text-primary/80 active:text-primary/60',
        destructive:
          'text-destructive-foreground bg-destructive hover:bg-destructive/80 active:bg-destructive/60',
      },
      size: {
        default: 'h-10 text-sm py-2 px-4',
        sm: 'h-9 text-xs px-3 rounded-md',
        lg: 'h-11 text-xl px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
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
