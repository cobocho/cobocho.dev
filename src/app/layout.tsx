/* eslint-disable import/order */
import type { Metadata } from 'next'
import { Noto_Sans_KR, Poppins } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

import { AutoScroll } from '@/components/layout/AutoScroll'
import { OutLineMenu } from '@/components/layout/OutLineMenu'

import './globals.css'
import './carousel.css'
import { DOMAIN, HOST } from '@/constants/domain'

const NotoSansKR = Noto_Sans_KR({
  display: 'swap',
  preload: true,
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const PoppinsFont = Poppins({
  display: 'swap',
  preload: true,
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const generateMetadata = (): Metadata => {
  const description = '기록장'
  const images = ['/images/default-thumbnail.png']

  return {
    title: {
      template: `%s | ${DOMAIN}`,
      default: DOMAIN,
    },
    metadataBase: new URL(`https://${HOST}`),
    openGraph: {
      title: DOMAIN,
      description,
      images,
    },
    twitter: {
      title: DOMAIN,
      description,
      images,
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${PoppinsFont.className} ${NotoSansKR.className} antialiased`}
      >
        <OutLineMenu>
          <div id="top-fix" />
          <div
            className="mx-auto w-content-limit max-w-full py-20 mobile:pl-2"
            id="container"
          >
            {children}
          </div>
          <AutoScroll />
        </OutLineMenu>
        <GoogleAnalytics gaId={GA_TRACKING_ID || ''} />
      </body>
    </html>
  )
}
