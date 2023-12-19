import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'Websocket Tester'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          fontSans.variable,
          fontMono.variable,
          'bg-zinc-950 text-white font-sans antialiased'
        )}
      >
        {children}
      </body>
    </html>
  );
}
