import JobCard from "@/components/JobCard";
import { JobType } from "@/util/Types";
import styles from "../styles/Main.module.css";
// import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home(props: { jobs: JobType[] }): JSX.Element {
  const { jobs } = props;
  return (
    // <Layout>
    <div className={styles.main}>
      <h1>JOB BOARD</h1>
      <div>
        <input placeholder="search" />
        <button>search</button>
      </div>
      {jobs.map(
        (job: JobType, index: number): JSX.Element => (
          <div key={index}>
            <Link href={`jobs/${job._id}`}>
              <JobCard {...job} />
            </Link>
            {/* <JobCard {...job} /> */}
          </div>
        )
      )}
    </div>
    // </Layout>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:8080/jobs");
  const jobs = await response.json();
  console.log(jobs);
  return {
    props: {
      jobs: jobs,
    },
  };
}
