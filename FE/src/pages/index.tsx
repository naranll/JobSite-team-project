import JobCard from "@/components/JobCard";
import styles from "../styles/Main.module.css";

export default function Home(): JSX.Element {
  return (
    <div className={styles.main}>
      <h1>JOB BOARD</h1>
      <div>
        <input placeholder="search" />
        <button>search</button>
      </div>
      <JobCard />
    </div>
  );
}
