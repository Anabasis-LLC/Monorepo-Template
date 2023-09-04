'use client';

// 3rd party
import React, { useEffect, useRef } from 'react';
import { motion, useAnimate, useInView } from 'framer-motion';

// package
import { Screen } from '@anabasis/ui';

/**
 * FadingScreen
 */

export const FadingScreen = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const target = useRef(null);
  const isAllInView = useInView(target, { amount: 'all' });
  const isSomeInView = useInView(target, { amount: 'some' });
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isAllInView) {
      animate(
        scope.current,
        { opacity: 1, scale: 1, y: 0 },
        { type: 'spring', stiffness: 100, damping: 20 },
      );
    } else if (!isSomeInView) {
      animate(
        scope.current,
        { opacity: 0, scale: 1.2, y: 50 },
        { duration: 0 },
      );
    }
  }, [isAllInView, isSomeInView, scope, animate]);

  return (
    <Screen ref={ref} {...props}>
      <div ref={target}>
        <motion.div
          ref={scope}
          initial={{ opacity: 0, scale: 1.2, y: 50 }}
          className="flex flex-col items-center"
        >
          {children}
        </motion.div>
      </div>
    </Screen>
  );
});
FadingScreen.displayName = 'FadingScreen';
