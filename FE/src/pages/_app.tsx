import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { UserContextProvider } from "../../context/UserContext";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}
