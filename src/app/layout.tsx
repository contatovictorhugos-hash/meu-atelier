import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Atelier — Santuário Visual de Rotina',
  description: 'Seu dia planejado com a beleza de um moodboard e a praticidade de um clique.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Atelier',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#FDF2F4',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="bg-[#FDF2F4]">
      <body className="min-h-screen bg-[#FDF2F4] text-[#1E1B1E] antialiased selection:bg-pink-200">
        <main className="max-w-md mx-auto min-h-screen bg-[#FDF2F4] relative flex flex-col shadow-2xl overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
