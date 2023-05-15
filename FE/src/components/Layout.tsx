import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";

interface PropType {
  children: ReactNode;
}

export default function Layout({ children }: PropType): JSX.Element {
  // useEffect(() => {
  //   if (router.asPath === "/") router.push({ query: { category: "all" } });
  // }, [router]);

  return (
    <div className="mx-auto relative">
      <Head>
        <title>Moonlight JobSite | The most easy-to-use job platform</title>
        <link rel="icon" href="/briefcase.ico" />
        <meta
          name="description"
          content="Search and apply for the latest jobs online. Find job openings from companies hiring now. Discover your next career opportunity today."
          key="desc"
        />
        <meta
          name="keywords"
          content="job, jobs, job opening, job opportunity, hire, hiring, employing, career, quick money, find employee, developer, designer"
        />
        <meta
          property="og:title"
          content="Moonlight JobSite | The most easy-to-use job platform"
        />
        <meta
          property="og:description"
          content="Search and apply for the latest jobs online. Find job openings from companies hiring now. Discover your next career opportunity today."
        />
        <meta
          property="og:image"
          content="https://github.com/naranll/JobSite-FE/blob/main/public/TestLogo.png"
        />
      </Head>
      <Header />
      <main className="min-h-screen flex pb-[70px] justify-center overflow-y-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
