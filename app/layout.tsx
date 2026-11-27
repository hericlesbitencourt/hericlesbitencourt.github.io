import './global.css';
import clsx from 'clsx';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Sidebar from '../components/sidebar';
import { ThemeProvider } from 'next-themes';

const kaisei = localFont({
  src: '../public/fonts/Raleway-Bold.ttf',
  weight: '700',
  variable: '--font-kaisei',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Hericles Bitencourt Rocha',
    template: '%s | Hericles Bitencourt Rocha',
  },
  description: 'Software Engineer and Computer Engineering Student.',
  openGraph: {
    title: 'Hericles Bitencourt Rocha',
    description: 'Software Engineer and Computer Engineering Student.',
    url: 'https://hericlesbitencourt.com',
    siteName: 'Hericles Bitencourt Rocha',
    emails: 'hericlesbitencourt@icloud.com',
    images: [
      {
        url: 'https://hericlesbitencourt.com/og.jpg',
        width: 1920,
        height: 1080,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Hericles Bitencourt Rocha',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={clsx(
        "antialiased",
        kaisei.variable
      )}
      suppressHydrationWarning>
      <body className="bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 min-h-screen">
        <ThemeProvider attribute="class" defaultTheme={'system'}>
          <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
            <Sidebar />
            <main className="flex-1 min-w-0 mt-0 md:mt-8 lg:mt-16 flex flex-col px-4 md:px-8 lg:px-12 pb-16">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
