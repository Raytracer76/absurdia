// app/layout.tsx
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Absurdia',
  description: 'Un monde d’idées absurdes et inutiles',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-neutral-900 text-white min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}