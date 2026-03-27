import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Counterfeit Detector — Détecteur de contrefaçons',
  description: "Analysez vos articles pour détecter les contrefaçons grâce à l'IA",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
