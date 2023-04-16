import Link from "next/link";
import * as Logos from "./icons/Logos";

export default function SideMenu(): JSX.Element {
  const navlinkStyle = "flex items-center gap-[15px] text-2xl font-bold mb-4";
  return (
    <div className="max-w-[287px] w-full h-screen py-[56px] text-white bg-gradient-to-b from-[#9F69B8] to-[#4D8BCC]"> 
      <h1 className="w-[227px] m-auto mb-[52px] flex items-center gap-[13px] text-3xl font-black"><Logos.MenuLogo/> Dashboard</h1>
      <ul className="w-[227px] h-[500px] m-auto">
        <Link href="/">
          <li className={navlinkStyle}><Logos.HomeLogo/> Home</li>
        </Link>
        <Link href="/">
          <li className={navlinkStyle}><Logos.JobLogo/>Jobs</li>
        </Link>
        <Link href="/">
          <li className={navlinkStyle}><Logos.UserLogo/>Users</li>
        </Link>
        <Link href="/" >
          <li className={navlinkStyle}><Logos.ApplicationLogo/>Applications</li>
        </Link>
        <Link href="/">
          <li className={navlinkStyle}><Logos.AdminLogo/>Admin</li>
        </Link>
      </ul>
    </div>
  );
}
