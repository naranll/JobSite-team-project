import "primeicons/primeicons.css";
import Link from "next/link";
import React, {useState} from "react";
import {useUserContext} from "@/context/UserContext";
import {Sidebar} from "primereact/sidebar";
import {useRouter} from "next/router";
import {FaUser} from "react-icons/fa";

export default function Header(): JSX.Element {
  const {currentUser, handleLogout} = useUserContext();
  const [visible, setVisible] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="header center-element w-full h-[46px] md:h-[54px] container mx-auto">
      <Link href={`/`} className="header-logo">
        <div>Logo</div>
      </Link>
      <div className="center-element gap-2">
        {!currentUser && (
          <Link
            href="/login"
            className="header-login-btn hidden sm:block sm:w-[60px]"
          >
            <div>Log In</div>
          </Link>
        )}
        <Link href={`/addjob`} className="btn-style">
          <span>Post a Job</span>
        </Link>
        {currentUser &&
          (currentUser.image ? (
            <picture className="header-user-img">
              <img
                src={currentUser.image}
                alt="user"
                onClick={() => setVisible(true)}
              />
            </picture>
          ) : (
            <div className="header-user-img" onClick={() => setVisible(true)}>
              <FaUser size={"1.2rem"} />
            </div>
          ))}
      </div>

      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
      >
        <Link
          href={`/user/${currentUser?._id}/appliedjobs`}
          onClick={() => setVisible(false)}
        >
          <div className="sidebar-options">Applied jobs</div>
        </Link>
        <Link
          href={`/user/${currentUser?._id}/postedjobs`}
          onClick={() => setVisible(false)}
        >
          <div className="sidebar-options">Posted jobs</div>
        </Link>
        {currentUser && (
          <Link
            href={`/user/${currentUser._id}`}
            onClick={() => setVisible(false)}
          >
            <div className="sidebar-options">User Profile / Settings</div>
          </Link>
        )}
        {currentUser ? (
          <div
            onClick={() => {
              handleLogout();
              setVisible(false);
              router.push("/");
            }}
            className="sidebar-options"
          >
            Logout
          </div>
        ) : null}
      </Sidebar>
    </div>
  );
}
