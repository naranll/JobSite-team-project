import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import styles from "../styles/header.module.css";
import Link from "next/link";


export default function Header(): JSX.Element {
  const { user, handleLogout } = useUserContext();
  const [offanvas, setOffcanvas] = useState(false)
  // const [visible, setVisible] = useState(false)


  return (
    <div className={styles.header}>
      <div className={styles.menu}>
        <div  id="mainBtn">
          <span className={`${offanvas?styles.menuBtnHidden: styles.menuBtn} `} onClick={() =>{ setOffcanvas(true)}}>&#9776;</span>
        </div>
        {offanvas ? (
          <div id="mySidenav" className="sidenav">
            <a className={styles.closebtn} onClick={() => setOffcanvas(false)}>
              &times;
            </a>
            <div className={styles.filters}>
              <Link href={`/user/appliedjobs`}>
              <div>Applied jobs</div>

              </Link>
              <Link href={`/user/postedjobs`}>
              <div>Posted jobs</div>

              </Link>
            </div>
          </div>
        ) : null}
      </div>
    
      <Link href={`/`}>
        
      <div>Logo</div>
      </Link>
      <Link href={`/addjob`}>
        <div className={styles.post}>Post</div>
      </Link>
      {user ? (
        <div>
          <div>Hi! {user.firstName}</div>
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <Link href={"/user/login"}>
          <div>LogIn</div>
        </Link>
      )}
    </div>
  );
}
