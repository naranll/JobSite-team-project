import styles from "../styles/Message.module.scss";
import { useUserContext } from "@/context/UserContext";

export default function Message(props: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { currentUser } = useUserContext();
  const { setModal } = props;


  return (
    <>
      <div className={styles.successModal}>
        <div className={styles.bgOpacity} onClick={() => setModal(false)} />
        <div className={styles.success}>
            <div className={styles.body}>
          <picture>
            <img className={styles.userImage} src={currentUser?.image} alt="sample" />
          </picture>
          <p className={styles.userEmail}>{currentUser?.email}</p>
          <p className={styles.para}>Conratulations </p>
            </div>
        <button className={styles.applicationBtn}>Go to my Application</button>
        </div>
      </div>
    </>
  );
}
