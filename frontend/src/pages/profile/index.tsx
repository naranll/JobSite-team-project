import { useState } from "react";
// import { useRouter } from "next/router";
import ProfileInfo from "@/components/subComponents/ProfileInfo";
import Posted from "@/components/subComponents/Posted";
import Applied from "@/components/subComponents/Applied";
import History from "@/components/subComponents/History";
// import { useUserContext } from "@/context/UserContext";
// import axios from "axios";
// import { UserType } from "@/util/types";

export default function Profile() {
  // const router = useRouter();
  // const { currentUser, token } = useUserContext();
  const [activeBtn, setActiveBtn] = useState<
    "profile" | "posted" | "applied" | "history"
  >("profile");

  //   useEffect(() => {
  //     if (!token) {
  //       router.push("/login");
  //     }

  //     // const userInfo = axios(`${process.env.NEXT_PUBLIC_JOBSITE_HOST}getProfile`, {
  //     //   headers: {
  //     //     authorizedToken: `Bearer: ${token}`,
  //     //   },
  //     // });
  //   }, [currentUser, router, token]);

  let activeComponent = <ProfileInfo />;
  switch (activeBtn) {
    case "profile":
      activeComponent = <ProfileInfo />; //user data
      break;
    case "posted":
      activeComponent = <Posted />; //userData
      break;
    case "applied":
      activeComponent = <Applied />; // userData
      break;
    case "history":
      activeComponent = <History />; // userData
      break;
    default:
      activeComponent = <ProfileInfo />; // userData
  }

  const navlinkStyle = "cursor-pointer p-2";
  const activeLinkStyle = "cursor-pointer bg-blue-300 rounded-lg p-2";

  return (
    <div className="w-screen border-2 rounded-lg m-5">
      <div className="m-5 md:flex lg:flex md:justify-center md:gap-5 lg:justify-center lg:gap-5 ">
        <div className="border-2 rounded-lg shadow-md md:w-1/5 md:h-full lg:h-full">
          <ul className="flex justify-center gap-5 text-start text-sm font-semibold m-5 md:flex md:flex-col ">
            <li
              className={
                activeBtn == "profile" ? activeLinkStyle : navlinkStyle
              }
              onClick={() => setActiveBtn("profile")}
            >
              Profile Info
            </li>
            <li
              className={activeBtn == "posted" ? activeLinkStyle : navlinkStyle}
              onClick={() => setActiveBtn("posted")}
            >
              Posted Jobs
            </li>
            <li
              className={
                activeBtn == "applied" ? activeLinkStyle : navlinkStyle
              }
              onClick={() => setActiveBtn("applied")}
            >
              Applied Jobs
            </li>
            <li
              className={
                activeBtn == "history" ? activeLinkStyle : navlinkStyle
              }
              onClick={() => setActiveBtn("history")}
            >
              History
            </li>
          </ul>
        </div>
        <div className="border-2 mt-5 min-h-screen rounded-lg shadow-md md:w-3/5 md:m-0 md:min-h-screen ">
          {activeComponent}
        </div>
      </div>
    </div>
  );
}
