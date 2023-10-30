'use client';

// 3rd party
import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

// lib
import { cn } from '../../lib/utils';

/**
 * getProgressColor
 */

export const getProgressColor = (value: number) =>
  `hsl(${(value * 120).toString(10)}, 100%, 50%)`;

/**
 * Progress
 */

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-5 w-full bg-black/10 rounded-lg overflow-hidden',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 transition-all"
      style={{
        transform: `translateX(${100 - (value || 0)}%)`,
        backgroundColor: getProgressColor((value || 0) / 100),
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
