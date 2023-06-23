// 3rd party
import { Inter, Poppins, JetBrains_Mono } from 'next/font/google';

// css
import 'ui/globals.css';

/**
 * Fonts
 */

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
  display: 'swap',
});

/**
 * RootLayout
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${mono.variable} h-full`}
    >
      <body className="h-full">{children}</body>
    </html>
  );
}
