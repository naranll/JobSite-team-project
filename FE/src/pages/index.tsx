import JobCard from "@/components/JobCard";
import { JobType } from "@/util/Types";
import styles from "../styles/Main.module.css";

export default function Home(props: { jobs: JobType[] }): JSX.Element {
  const { jobs } = props;
  return (
    <div className={styles.main}>
      <h1>JOB BOARD</h1>
      <div>
        <input placeholder="search" />
        <button>search</button>
      </div>
      {jobs.map((job: JobType, index: number) => (
        <div key={index}>
          <JobCard />
        </div>
      ))}
    </div>
  );
}

// export async function getStaticProps() {
//   const response = await fetch("http://localhost:8080/jobs");
//   const jobs = await response.json();

//   return {
//     props: {
//       jobs: jobs,
//     },
//   };
// }
