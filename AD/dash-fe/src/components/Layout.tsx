import { ReactNode } from "react";
import Head from "next/head";
import SideMenu from "./SideMenu";
// import { Inter } from "@next/font/google";

// const inter = Inter({
//   subsets: ['latin'],
//   variable: "--font-inter",
// })

// const inter2 = Inter();

interface PropType {
  children: ReactNode;
}

export default function Layout({ children }: PropType): JSX.Element {
  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`flex min-h-screen font-inter`} >
        <SideMenu />
        {children}
      </main>
    </div>
  );
}
