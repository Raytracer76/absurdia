// app/layout.tsx
import './globals.css'; // ou ton fichier global CSS si tu en as un
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
    <html lang="fr">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

