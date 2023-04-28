import { useUserContext } from "../context/UserContext";
import styles from "../styles/addjob.module.css";

export default function Success(): JSX.Element {
  const { user } = useUserContext();
  return (
    <div className={styles.success}>Success!!! Hello {user?.firstName}</div>
  );
}
