import { useUserContext } from "../context/UserContext";
import styles from "../styles/addjob.module.css";
import Cookies from "js-cookie";

export default function Success(): JSX.Element {
  const { currentUser, setCurrentUser } = useUserContext();

  function handleLogout() {
    setCurrentUser(null);
    Cookies.remove("token");
  }
  return (
    <>
      <div className={styles.success}>
        <p>Success!!! Hello {currentUser?.email}</p>
      </div>
      <div>
        <p>id: {currentUser?._id}</p>
      </div>
      <picture>
        <img src={currentUser?.image} alt="sample" />
      </picture>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
