import React from 'react';

import { cn } from '../../lib/utils';

const Screen = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col h-screen min-h-[300px] items-center justify-center',
      className,
    )}
    {...props}
  />
));
Screen.displayName = 'Screen';

export { Screen };
