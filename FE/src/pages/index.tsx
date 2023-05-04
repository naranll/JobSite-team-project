import JobCard from "@/components/JobCard";
import { JobType } from "@/util/types";
// import "../styles/jobcard.scss";
import Link from "next/link";

export default function Home(props: { jobs: JobType[] }): JSX.Element {
  const { jobs } = props;
  return (
    <div className="main">
      <h1>JOB BOARD</h1>
      <div className="search">
        <input placeholder="search" />
        <button>search</button>
      </div>
      {jobs.map(
        (job: JobType, index: number): JSX.Element => (
          <div key={index}>
            <Link href={`jobs/${job._id}`}>
              <JobCard {...job} />
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch("http://localhost:8008/job/all");
    const jobs = await response.json();
    return {
      props: {
        jobs: jobs,
      },
    };
  } catch (error) {
    console.log("error:", error);
  }
}
