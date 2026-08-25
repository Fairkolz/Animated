import type { Metadata } from 'next'
import '../styles/globals.css'
import SmoothScroll from '../components/SmoothScroll'
import BagProvider from '../components/shared/BagProvider'

export const metadata: Metadata = {
  title: 'AUVERER — Luxury Skincare',
  description: 'A cinematic luxury skincare experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Set before first paint so CSS can safely hide data-reveal
            elements ONLY when the reveal observer will actually run —
            without JS everything stays visible (no flash either way). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <BagProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </BagProvider>
      </body>
    </html>
  )
}
