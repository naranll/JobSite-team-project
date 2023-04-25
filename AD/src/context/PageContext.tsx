import React, {useContext, createContext, useState} from "react";

interface PropType {
  children: React.ReactNode;
}

interface PageType {
  page: string;
  url: string;
}

interface ContextType {
  currentPage: PageType;
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
}

const PageContext = createContext<ContextType>({} as ContextType);

export const usePage = (value: string) => {
  console.log("value", value);
  return useContext(PageContext);
};

export default function PageContextProvider({children}: PropType): JSX.Element {
  const [currentPage, setCurrentPage] = useState<PageType>({
    page: "Home",
    url: "/",
  });
  return (
    <PageContext.Provider value={{currentPage, setCurrentPage}}>
      {children}
    </PageContext.Provider>
  );
}
