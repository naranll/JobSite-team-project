import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { UserContextProvider } from "../context/UserContext";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
// import 'primeicons/primeicons.css';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}
