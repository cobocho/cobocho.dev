import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/react';
import { ThemeContextProvider } from '@/hooks/useThemeToggle';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const p = router.asPath.slice(1);
  const DOMAIN = process.env.DOMAIN;
  const canonicalURL = `https://${DOMAIN}${p}`.split('?')[0];

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalURL} />
      </Head>
      <ThemeContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeContextProvider>
      <Analytics />
    </>
  );
}
