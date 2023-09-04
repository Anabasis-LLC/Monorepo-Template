// package
import { cn } from '@anabasis/ui';

// lib
import { Header } from './header';
import { Footer } from './footer';

/**
 * Shell
 */

export type ShellProps = React.HTMLAttributes<HTMLDivElement> & {
  container?: boolean;
  header?: boolean;
  footer?: boolean;
};

export const Shell = ({
  className,
  container = true,
  header = true,
  footer = true,
  children,
}: ShellProps) => {
  return (
    <div className={cn('flex flex-col h-full w-full', className)}>
      {header && <Header />}
      {container ? (
        <div
          className={cn({
            'container mx-auto mt-20 p-10 min-h-[300px]': container,
          })}
        >
          {children}
        </div>
      ) : (
        children
      )}
      {footer && <Footer />}
    </div>
  );
};
