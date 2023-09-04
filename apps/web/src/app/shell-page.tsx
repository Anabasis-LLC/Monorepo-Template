// package
import { SessionUser, SessionProvider } from '@anabasis/hooks';

// lib
import { getSessionUser } from '@/lib/server';
import { Shell } from '@/components';

/**
 * ShellPage
 */

export type ShellPageProps = {
  sessionUser?: SessionUser | undefined;
  requireAuthentication?: boolean;
  container?: boolean;
  header?: boolean;
  footer?: boolean;
  children: React.ReactNode;
};

export async function ShellPage({
  sessionUser,
  requireAuthentication = true,
  container = true,
  header = true,
  footer = true,
  children,
}: ShellPageProps) {
  const user =
    typeof sessionUser === 'undefined' ? await getSessionUser() : sessionUser;

  const isNotAuthorized = requireAuthentication === true && user === null;

  return (
    <SessionProvider user={user}>
      <Shell container={container} header={header} footer={footer}>
        {isNotAuthorized ? <div>Not Authorized</div> : children}
      </Shell>
    </SessionProvider>
  );
}
