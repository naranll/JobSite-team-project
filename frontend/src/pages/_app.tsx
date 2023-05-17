import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { UserContextProvider } from "../context/UserContext";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import { ChakraProvider } from "@chakra-ui/react";
import Loader from "@/components/loader";
// import 'primeicons/primeicons.css';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider>
      <UserContextProvider>
        <Loader>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Loader>
      </UserContextProvider>
    </ChakraProvider>
  );
}
