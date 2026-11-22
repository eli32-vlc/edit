import type { Metadata, Viewport } from 'next'

import './globals.css'

import { Shell } from '@/components/Shell'
import { getPages } from '@/lib/api'

export const metadata: Metadata = {
  title: { default: 'FMHY X', template: '%s • FMHY X' },
  description: 'The largest collection of free stuff on the internet.'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pages = await getPages()

  return (
    <html lang="en">
      <body>
        <Shell pages={pages}>{children}</Shell>
      </body>
    </html>
  )
}
