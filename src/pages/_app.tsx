import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const p = router.asPath.slice(1);
  const DOMAIN = process.env.DOMAIN;
  const canonicalURL = `https://${DOMAIN}${p}`.split('?')[0];

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={canonicalURL}
        />
      </Head>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
      <Analytics />
    </>
  );
}
