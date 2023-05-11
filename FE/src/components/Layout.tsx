import {ReactNode, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";

interface PropType {
  children: ReactNode;
}

export default function Layout({children}: PropType): JSX.Element {
  const router = useRouter()

  useEffect(()=>{
    if(router.asPath==="/") router.push({query : {category : "all"}})
  },[router])
  return (
    <div className="mx-auto relative">
      <Header />
      <main className="min-h-screen flex pb-[70px] justify-center overflow-y-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
