import Link from "next/link";
import LogoDashboard from "./icons/LogoDashboard";

export default function SideMenu(): JSX.Element {
  const navlinkStyle = "text-2xl font-bold mb-4";
  return (
    <div className="max-w-[287px] w-full h-screen py-[56px] text-white bg-gradient-to-b from-[#9F69B8] to-[#4D8BCC]"> 
      <h1 className="w-[227px] m-auto mb-[52px] flex items-center gap-[13px] text-3xl font-black"><LogoDashboard/> Dashboard</h1>
      <ul className="w-[227px] h-[500px] m-auto border-solid border-2 border-black">
        <Link
          href="/"
        >
          <li className={navlinkStyle}>Jobs</li>
        </Link>
        <Link href="/">
          <li className={navlinkStyle}>Users</li>
        </Link>
        <Link href="/" >
          <li className={navlinkStyle}>Applications</li>
        </Link>
        <Link href="/">
          <li className={navlinkStyle}>Admin</li>
        </Link>
      </ul>
    </div>
  );
}
