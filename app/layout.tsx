import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { SearchProvider } from '@/components/search/SearchProvider';
import { getAllSections, getAllSearchableItems } from '@/lib/content';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-heading',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Zero One Handbook',
    template: '%s | Zero One Handbook',
  },
  description:
    'Internal company handbook for Zero One Creative — SOPs, reference docs, policies, and guides.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sections = getAllSections();
  const searchItems = getAllSearchableItems().map((item) => ({
    ...item,
    // Truncate content for client-side search to keep payload small
    content: item.content.slice(0, 2000),
  }));

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <SearchProvider items={searchItems}>
            <div className="flex min-h-screen flex-col">
              <Header sections={sections} />
              <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 overflow-y-auto">
                  <div className="mx-auto max-w-4xl px-4 py-6 lg:px-8">
                    {children}
                  </div>
                  <Footer />
                </main>
              </div>
            </div>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
