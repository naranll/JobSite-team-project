import Link from "next/link";
import {Sidebar} from "primereact/sidebar";
import React, {useState} from "react";

import "primeicons/primeicons.css";
import {useUserContext} from "@/context/UserContext";

export default function Header(): JSX.Element {
  const {currentUser, handleLogout} = useUserContext();
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="header center-element w-full h-[46px] md:h-[54px]">
      <Link href={`/`} className="header-logo">
        <div>Logo</div>
      </Link>
      <div className="center-element gap-2">
        <Link href={`/addjob`} className="button-style">
          <span>Post a Job</span>
        </Link>
        {currentUser && (
          <picture className="w-[40px]">
            <img
              src={currentUser.image}
              alt="user"
              onClick={() => setVisible(true)}
            />
          </picture>
        )}
      </div>

      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <div>
          <div>
            <Link href={`/user/appliedjobs`}>
              <div>Applied jobs</div>
            </Link>
            <Link href={`../user/postedjobs`}>
              <div>Posted jobs</div>
            </Link>
            {currentUser ? <div onClick={handleLogout}>Logout</div> : null}
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
