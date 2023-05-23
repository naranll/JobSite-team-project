import { useState } from "react";
import ProfileInfo from "@/components/subComponents/ProfileInfo";
import Posted from "@/components/subComponents/Posted";
import Applied from "@/components/subComponents/Applied";
import History from "@/components/subComponents/History";
import Applicants from "@/components/subComponents/Applicants";
import Applicant from "@/components/subComponents/Applicant";

export default function Profile(): JSX.Element {
  // const router = useRouter();
  const [activeBtn, setActiveBtn] = useState<
    "profile" | "posted" | "applied" | "history" | "applicants" | "applicant"
  >("profile");
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>(
    undefined
  );
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    string | undefined
  >(undefined);

  let activeComponent;
  switch (activeBtn) {
    case "profile":
      activeComponent = <ProfileInfo />;
      break;
    case "posted":
      activeComponent = (
        <Posted
          setActiveBtn={setActiveBtn}
          setSelectedJobId={setSelectedJobId}
        />
      );
      break;
    case "applied":
      activeComponent = <Applied />;
      break;
    case "history":
      activeComponent = <History />;
      break;
    case "applicants":
      activeComponent = (
        <Applicants
          selectedJobId={selectedJobId}
          setActiveBtn={setActiveBtn}
          setSelectedApplicationId={setSelectedApplicationId}
        />
      );
      break;
    case "applicant":
      activeComponent = (
        <Applicant selectedApplicationId={selectedApplicationId} />
      );
      break;
    default:
      activeComponent = <ProfileInfo />;
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
              className={
                activeBtn == "posted" ||
                activeBtn == "applicants" ||
                activeBtn == "applicant"
                  ? activeLinkStyle
                  : navlinkStyle
              }
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
