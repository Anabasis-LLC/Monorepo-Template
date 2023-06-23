'use client';

// 3rd party
import Link from 'next/link';

export const Logo = () => {
  return (
    <div className="relative flex items-center gap-3">
      <Link
        href="/"
        className="font-serif hover:underline active:opacity-80 relative active:top-px"
      >
        Logo
      </Link>
    </div>
  );
};
