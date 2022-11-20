import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Head from 'next/head';

function EventsApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>Events App | Admin Dashboard</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default EventsApp;
