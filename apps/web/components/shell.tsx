// package
import { cn } from 'ui';

// lib
import { Header } from './header';
import { Footer } from './footer';

/**
 * Shell
 */

export type ShellProps = React.HTMLAttributes<HTMLDivElement> & {
  container?: boolean;
};

export const Shell = ({
  className,
  container = true,
  children,
}: ShellProps) => {
  return (
    <div className={cn('flex flex-col h-full w-full', className)}>
      <Header />
      <div
        className={cn({
          'container mx-auto mt-20 p-10 min-h-[300px]': container,
        })}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};
