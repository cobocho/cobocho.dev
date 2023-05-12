import Layout from '@/components/Layout'
import { DOMAIN } from '@/constants/domain';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const p = router.asPath.slice(1);
  const canonicalURL = `https://${DOMAIN}${p}`.split("?")[0];
  
  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalURL} />
      </Head>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </>
  )
}
