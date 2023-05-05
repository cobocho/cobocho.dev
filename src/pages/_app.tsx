import Layout from '@/components/Layout'
import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Footer />
    </>
  )
}
