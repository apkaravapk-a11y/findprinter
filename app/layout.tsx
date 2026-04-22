import type { Metadata, Viewport } from 'next';
import './globals.css';
import Link from 'next/link';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LocationProvider } from '@/components/LocationProvider';
import { LocationBadge } from '@/components/LocationPicker';
import { Footer } from '@/components/Footer';
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration';

export const metadata: Metadata = {
  title: 'FindPrinter — Printers for India',
  description:
    'Live Amazon, Flipkart and Croma prices. Honest TCO math. No affiliate pressure. Find the right colour printer for your budget and volume.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'FindPrinter',
  },
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#facc15',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="top" className="min-h-screen flex flex-col">
        <ThemeProvider>
          <ServiceWorkerRegistration />
          <LocationProvider>
            <header
              className="border-b-[3px] sticky top-0 z-30 backdrop-blur"
              style={{
                borderColor: 'var(--ink)',
                background: 'color-mix(in srgb, var(--card) 92%, transparent)',
              }}
            >
              <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 gap-2">
                <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                  <div
                    className="w-9 h-9 border-[2px] rounded-lg shadow-brutSm flex items-center justify-center text-xl"
                    style={{ background: 'var(--sun)', borderColor: 'var(--ink)' }}
                  >
                    🖨️
                  </div>
                  <span className="font-extrabold text-lg tracking-tight">
                    PrinterPick<span style={{ color: 'var(--muted)' }}>.IN</span>
                  </span>
                </Link>
                <div className="flex items-center gap-1.5 text-sm">
                  <Link
                    href="/learn"
                    className="brut-btn-ghost !px-2.5 !py-1.5 hidden md:inline-flex"
                  >
                    📚 Learn
                  </Link>
                  <Link
                    href="/browse"
                    className="brut-btn-ghost !px-2.5 !py-1.5 hidden sm:inline-flex"
                  >
                    Browse
                  </Link>
                  <Link href="/quiz" className="brut-btn !px-2.5 !py-1.5">
                    Quiz
                  </Link>
                  <LocationBadge />
                  <ThemeSwitcher />
                </div>
              </nav>
            </header>

            <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">{children}</main>

            <Footer />
          </LocationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
