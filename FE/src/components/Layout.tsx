import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PropType {
  children: ReactNode;
}

export default function Layout({ children }: PropType): JSX.Element {
  return (
    <div className="xl:container mx-auto relative pb-[100px]">
      <Header />
      <main className="min-h-screen flex justify-center">{children}</main>
      <Footer />
    </div>
  );
}
