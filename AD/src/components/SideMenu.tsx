import Link from "next/link";
import * as Logos from "./icons/Logos";
import { useEffect, useState } from "react";

type menuPageType = {
  page: string;
  url: string;
  logo: JSX.Element;
};

const menuPages: Array<menuPageType> = [
  {
    page: "Home",
    url: "/",
    logo: <Logos.HomeLogo />,
  },
  {
    page: "Jobs",
    url: "/jobs",
    logo: <Logos.JobLogo />,
  },
  {
    page: "Users",
    url: "/users",
    logo: <Logos.UserLogo />,
  },
  {
    page: "Applications",
    url: "/applications",
    logo: <Logos.ApplicationLogo />,
  },
  {
    page: "Admin",
    url: "/admin",
    logo: <Logos.AdminLogo />,
  },
];

export default function SideMenu(): JSX.Element {
  const [currentPage, setCurrentPage] = useState("/");

  useEffect(() => {
    if (localStorage.getItem("pageValue")) {
      setCurrentPage(
        menuPages.find(
          (menuPage) => menuPage.page === localStorage.getItem("pageValue")
        )
      );
    }
  }, []);

  function currentPageHandler(page: string) {
    setCurrentPage(page);
    localStorage.setItem("pageValue", page);
  }

  const navlinkStyle =
    "flex items-center gap-[15px] text-xl font-bold mb-4 hover:underline hover:decoration-solid active:bg-white active:text-[#9F69B8]";

  return (
    <div className="w-1/5 h-screen py-9 sticky top-0 text-white bg-gradient-to-b from-[#9F69B8] to-[#4D8BCC]">
      <h1 className="w-[227px] m-auto mb-[52px] flex items-center gap-[13px] text-2xl font-black">
        <Logos.MenuLogo />
        Dashboard
      </h1>
      <ul className="w-[227px] h-[500px] m-auto">
        {menuPages.map((menuPage: menuPageType, i: number) => (
          <Link
            key={i}
            href={menuPage.url}
            onClick={() => currentPageHandler(menuPage.page)}
          >
            <li className={navlinkStyle}>
              {menuPage.logo}
              {menuPage.page}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
