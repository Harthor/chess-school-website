// src/app/layout.tsx
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Chess School',
  description: 'Learn chess at our school!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:;
            style-src 'self' 'unsafe-inline';
            worker-src 'self' blob:;
            connect-src 'self' blob: ws: wss:;
          "
        />
      </head>
      <body className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
