import JobCard from "@/components/JobCard";
import {JobType} from "@/util/types";
import Link from "next/link";

export default function Home(props: {jobs: JobType[]}): JSX.Element {
  const {jobs} = props;
  return (
    <div className="home-page flex flex-col items-center gap-3">
      <h1 className="home-title">JOB BOARD</h1>
      <form className="searchbar h-[30px] w-4/6 lg:h-[40px] drop-shadow-sm">
        <input type="search" placeholder="Enter search" className="w-5/6" />
        <button className="w-1/6 hidden sm:block">Search</button>
      </form>
      <div className="home-joblist w-5/6">
        {jobs.map(
          (job: JobType, index: number): JSX.Element => (
            <Link href={`jobs/${job._id}`} key={index}>
              <JobCard {...job} />
            </Link>
          )
        )}
      </div>
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
