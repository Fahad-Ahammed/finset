
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import '@/styles/globals.css';
import StoreProvider from "@/store/providers";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";

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
      <body className="flex h-full min-h-screen">
        <StoreProvider>
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-auto">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
