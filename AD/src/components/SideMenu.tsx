import Link from "next/link";
import * as Logos from "./icons/Logos";
import {useEffect, useState} from "react";
import React from "react";

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
  const [currentPage, setCurrentPage] = useState("Home");

  useEffect(() => {
    if (localStorage.getItem("pageValue")) {
      const currentPageValue: menuPageType | undefined = menuPages.find(
        (menuPage: menuPageType) =>
          menuPage.page === localStorage.getItem("pageValue")
      );
      currentPageValue && setCurrentPage(currentPageValue.page);
    }
  }, []);

  function currentPageHandler(page: string) {
    setCurrentPage(page);
    localStorage.setItem("pageValue", page);
  }

  const navlinkStyle =
    "flex items-center gap-[12px] p-2 mb-4 text-xl font-bold border-2 border-transparent hover:border-2 hover:border-white hover:rounded-full active:rounded-full active:bg-white active:text-[#9F69B8]";
  const activeLinkStyle =
    "border-2 rounded-full border-solid border-white bg-white text-[#9F69B8]";

  return (
    <div className="w-1/5 h-screen px-3 py-9 sticky top-0 text-white bg-gradient-to-b from-[#9F69B8] to-[#4D8BCC]">
      <h1 className="w-[227px] m-auto mb-[52px] flex items-center gap-[13px] text-2xl font-black">
        <Logos.MenuLogo />
        Dashboard
      </h1>
      <ul className="w-auto h-[500px] m-auto">
        {menuPages.map((menuPage: menuPageType, i: number) => (
          <Link
            key={i}
            href={menuPage.url}
            onClick={() => currentPageHandler(menuPage.page)}
          >
            <li
              className={
                currentPage == menuPage.page
                  ? navlinkStyle.concat(",", activeLinkStyle)
                  : navlinkStyle
              }
            >
              {menuPage.logo}
              {menuPage.page}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
