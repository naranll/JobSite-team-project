import Link from "next/link";
import * as Logos from "./icons/Logos";

export default function SideMenu(): JSX.Element {
  const navlinkStyle = "flex items-center gap-[15px] text-xl font-bold mb-4 hover:underline hover:decoration-solid active:bg-white active:text-[#9F69B8]";
  return (
    <div className="w-1/5 h-screen py-9 sticky top-0 text-white bg-gradient-to-b from-[#9F69B8] to-[#4D8BCC]"> 
      <h1 className="w-[227px] m-auto mb-[52px] flex items-center gap-[13px] text-2xl font-black"><Logos.MenuLogo/>Dashboard</h1>
      <ul className="w-[227px] h-[500px] m-auto">
        <Link href="/">
          <li className={navlinkStyle}><Logos.HomeLogo/>Home</li>
        </Link>
        <Link href="/jobs">
          <li className={navlinkStyle}><Logos.JobLogo/>Jobs</li>
        </Link>
        <Link href="/users">
          <li className={navlinkStyle}><Logos.UserLogo/>Users</li>
        </Link>
        <Link href="/applications" >
          <li className={navlinkStyle}><Logos.ApplicationLogo/>Applications</li>
        </Link>
        <Link href="/admin">
          <li className={navlinkStyle}><Logos.AdminLogo/>Admin</li>
        </Link>
      </ul>
    </div>
  );
}
