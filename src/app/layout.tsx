import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import '@/styles/globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'FinSight Dashboard',
  description: 'Frontend-only financial tracking dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
