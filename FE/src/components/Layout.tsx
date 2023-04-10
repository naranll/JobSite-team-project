import { ReactNode } from "react";
import Header from "./Header";

interface PropType {
  children: ReactNode;
}

export default function Layout({ children }: PropType): JSX.Element {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
