import {useState} from "react";
import {useUserContext} from "../../context/UserContext";
import styles from "../styles/header.module.css";
import Link from "next/link";

export default function Header(): JSX.Element {
  const {user, handleLogout} = useUserContext();
  const [offanvas, setOffcanvas] = useState(false);
  // const [visible, setVisible] = useState(false)

  return (
    <div className={styles.header}>
      <Link href={`/`}>
        <div className={styles.logo}>Logo</div>
      </Link>
      <div className={styles.menu}>
        {offanvas ? (
          <div id="mySidenav" className="sidenav">
            <div className={styles.filters}>
              <Link
                href={`/user/appliedjobs`}
                onClick={() => setOffcanvas(false)}
              >
                <div>Applied jobs</div>
              </Link>
              <Link
                href={`/user/postedjobs`}
                onClick={() => setOffcanvas(false)}
              >
                <div>Posted jobs</div>
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      <Link href={`/addjob`}>
        <span className={styles.post}>Post a Job</span>
      </Link>

      <div id="mainBtn">
        <span
          className={`${offanvas ? styles.menuBtnHidden : styles.menuBtn} `}
          onClick={() => {
            setOffcanvas(true);
          }}
        >
          &#9776;
        </span>
        <a className={styles.closebtn} onClick={() => setOffcanvas(false)}>
          &times;
        </a>
      </div>
    </div>
  );
}
