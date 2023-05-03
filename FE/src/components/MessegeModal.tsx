import styles from "../styles/Message.module.scss";
import { useUserContext } from "@/context/UserContext";
import Link from "next/link";

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
            <picture className={styles.succeedImage}>
            <img src="../image/succeedImage.png" alt="#" />
          </picture>
          <p className={styles.userEmail}>{currentUser?.email}</p>
          <p className={styles.para}>Conratulations </p>
            </div>
            <Link href={`../`}>
              <button className={styles.applicationBtn}>Go to my Application</button>
            </Link>
        </div>
      </div>
    </>
  );
}
