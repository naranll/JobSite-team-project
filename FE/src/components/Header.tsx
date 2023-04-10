import styles from "../styles/header.module.css";
// import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <div className={styles.header}>
      <div className={styles.menu}>Menu</div>
      <div>Logo</div>

      <div className={styles.post}>Post</div>
    </div>
  );
}
