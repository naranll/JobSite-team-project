import styles from '../styles/appliedJob.module.scss'
import Link from "next/link";

export default function Apply(props: {
  setApply: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { setApply } = props

  return (
    <>
      <div className={styles.successModal}>
        <div className={styles.bgOpacity} onClick={() => setApply(false)} />
        <div className={styles.success}>
          <picture className={styles.succeedImage}>
            <img src="../image/succeedImage.png" alt="#" />
          </picture>
          <div className={styles.body}>
            <p className={styles.para}>Conratulations </p>
          </div>
          <Link href={`/`}>
            <button className={styles.applicationBtn}>Go to my Application</button>
          </Link>
        </div>
      </div>
    </>
  )
}