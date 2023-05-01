// import {useUserContext} from "../../context/UserContext";

import styles from "../styles/header.module.css";
import Link from "next/link";
import { Sidebar } from "primereact/sidebar";
import React, { useState } from "react";
<<<<<<< Updated upstream
import "primeicons/primeicons.css";
import { AiOutlineMenu } from "react-icons/ai";

=======
import 'primeicons/primeicons.css';
import {AiOutlineMenu } from "react-icons/ai"
        
>>>>>>> Stashed changes
export default function Header(): JSX.Element {
  // const {user, handleLogout} = useUserContext();
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className={styles.header}>
      <Link href={`/`}>
        <div className={styles.logo}>Logo</div>
      </Link>

      <Link href={`/addjob`}>
        <span className={styles.post}>Post a Job</span>
      </Link>

      <div className="card flex justify-content-center ">
        <Sidebar visible={visible} onHide={() => setVisible(false)}>
          <div id="mySidenav" className="sidenav">
            <div className={styles.filters}>
              <Link href={`/user/appliedjobs`}>
                <div className="AppliedJobs">Applied jobs</div>
              </Link>
              <Link href={`/user/postedjobs`}>
                <div className="PostedJobs">Posted jobs</div>
              </Link>
            </div>
          </div>
        </Sidebar>
        {/* <Button className="pi pi-bars" severity="info" outlined onClick={() => setVisible(true)}/> */}

        <AiOutlineMenu
          className={styles.offcanvasmenu}
          onClick={() => setVisible(true)}
        />
      </div>
    </div>
  );
}
