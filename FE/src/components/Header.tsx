import styles from "../styles/header.module.css";
import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <div className={styles.header}>
      <Link href={`/`}>
        <div className={styles.menu}>Menu</div>
      </Link>
      <div>Logo</div>
      <Link href={`/addjob`}>
        <div className={styles.post}>Post</div>
      </Link>
      <Link href={"/user/login"}>
        <div>LogIn</div>
      </Link>
    </div>
  );
}
