import Filter from "@/components/Filter";
import JobCard from "@/components/JobCard";
import { JobType } from "@/util/types";
import Link from "next/link";

export default function Home(props: { jobs: JobType[] }): JSX.Element {
  const { jobs } = props;
  return (
    <div className="home-page flex flex-col items-center gap-3">
      <h1 className="home-title">JOB BOARD</h1>
      <form className="searchbar h-[30px] w-4/6 lg:h-[40px]">
        <input
          type="search"
          placeholder="Enter search"
          className="w-full sm:w-5/6"
        />
        <button className="hidden sm:block sm:w-1/6">Search</button>
      </form>
      <div className="w-full lg:container lg:flex lg:gap-5">
        <div className="home-filter hidden lg:block lg:w-1/5 lg:h-[360px] lg:p-4 shadow">
          <Filter />
        </div>
        <div className="home-joblist mx-auto w-5/6 lg:w-4/5">
          {jobs.map(
            (job: JobType, index: number): JSX.Element => (
              <Link href={`jobs/${job._id}`} key={index}>
                <JobCard {...job} />
              </Link>
            )
          )}
        </div>
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
