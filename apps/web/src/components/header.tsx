'use client';

// 3rd party
import { useEffect } from 'react';
import { useAnimate } from 'framer-motion';
import { signIn, signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

// package
import { Button, cn } from '@anabasis/ui';
import { useSessionUser } from '@anabasis/auth/client';
import { useWindowScroll } from '@anabasis/hooks';

// lib
import { Logo } from './logo';

/**
 * Header
 */

export const Header = () => {
  const user = useSessionUser();
  const [scope, animate] = useAnimate();
  const [position] = useWindowScroll();
  const isScrolled = position.y > 0;

  useEffect(() => {
    if (isScrolled) {
      animate(scope.current, { height: 80 });
    } else {
      animate(scope.current, { height: 112 });
    }
  }, [isScrolled, scope, animate]);

  return (
    <div
      ref={scope}
      className={cn('fixed z-10 w-screen h-28', {
        'bg-selection/10 backdrop-blur-md border-b border-black/10': isScrolled,
      })}
    >
      <div className="container flex items-center justify-between h-full">
        <Logo />
        {user ? (
          <div className="flex items-center gap-2">
            <div className="font-bold">{user.name}</div>
            <Button variant="ghost" onClick={() => signOut()}>
              <LogOut className="text-pink" />
            </Button>
          </div>
        ) : (
          <Button variant="pink" onClick={() => signIn('discord')}>
            Get Started
          </Button>
        )}
      </div>
    </div>
  );
};
