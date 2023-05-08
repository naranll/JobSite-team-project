import {ReactNode} from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PropType {
  children: ReactNode;
}

export default function Layout({children}: PropType): JSX.Element {
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
