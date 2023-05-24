import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Loader>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Loader>
  );
}
