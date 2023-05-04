import styles from "../styles/appliedJob.module.scss";
import Link from "next/link";

export default function ApplyModal(props: {
  setApply: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setApply } = props;

  return (
    <>
      <div className={styles.successModal}>
        <div className={styles.bgOpacity} />
        <div className={styles.success}>
          <picture className={styles.succeedImage}>
            <img src="../image/succeedImage.png" alt="#" />
          </picture>
          <div className={styles.body}>
            <p className={styles.para}>Congratulations </p>
          </div>
          <Link
            href={`/`}
            className={styles.applicationBtn}
            onClick={() => setApply(false)}
          >
            <button>Go to my Application</button>
          </Link>
        </div>
      </div>
    </>
  );
}
