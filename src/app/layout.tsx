import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { ScrollRestorationHandler } from '@/components/ScrollRestorationHandler';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1e3a5f',
};

export const metadata: Metadata = {
  title: {
    default: 'JULIA - Especialistas en Herencias y Sucesiones en México',
    template: '%s | Julia Legal Consulting',
  },
  description: 'Resolvemos conflictos hereditarios de forma clara, rápida y legalmente segura. Más de 100 sucesiones resueltas, $50M+ patrimonio recuperado. Sin costo inicial.',
  keywords: [
    'herencias México',
    'sucesiones México',
    'abogado herencias',
    'testamento México',
    'patrimonio heredado',
    'legado',
    'distribución de bienes',
    ' herencia México',
    'abogado succession',
    'heritage lawyer',
    'abogado sucesiones',
  ],
  authors: [{ name: 'Lic. Eben Francisco Rodríguez Vela' }],
  creator: 'Julia Legal Consulting',
  publisher: 'Julia Legal Consulting',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://julialegalconsulting.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es-MX': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://julialegalconsulting.com',
    siteName: 'Julia Legal Consulting',
    title: 'Julia Legal Consulting - Especialistas en Herencias y Sucesiones en México',
    description: 'Resolvemos conflictos hereditarios de forma clara, rápida y legalmente segura. Sin costo inicial.',
    images: [
      {
        url: '/images/julia.png',
        width: 1200,
        height: 630,
        alt: 'Julia Herencias - Especialistas en Herencias',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Julia Legal Consulting - Especialistas en Herencias y Sucesiones en México',
    description: 'Resolvemos conflictos hereditarios de forma clara, rápida y legalmente segura. Sin costo inicial.',
    images: ['/images/julia.png'],
    site: '@julialegalconsulting',
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
  verification: {
    google: 'tu-codigo-google-search-console',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-julia-cream antialiased font-sans">
        <ScrollRestorationHandler />
        {children}
      </body>
    </html>
  );
}
