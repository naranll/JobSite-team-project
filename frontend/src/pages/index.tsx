/* eslint-disable @typescript-eslint/no-explicit-any */
import Filter from "@/components/Filter";
import JobCard from "@/components/JobCard";
import { JobType } from "@/util/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagenation";

export default function Home(props: { jobs: JobType[] }): JSX.Element {
  const { jobs } = props;
  const [showJobs, setShowJobs] = useState<JobType[]>();
  const route = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function changeHandler(e: any): void {
    route.push({ query: { category: e.currentTarget.value } });
    return;
  }

  useEffect(() => {
    setShowJobs(jobs);
  }, [jobs]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function submitHandler(e: any): void {
    e.preventDefault();

    if (e.target.search.value.trim() === "") {
      route.query.s = e.target.search.value;
      return;
    }
    route.query.s = e.target.search.value;
    route.push(route);
    return;
  }

  return (
    <div className="home-page flex flex-col items-center gap-3 overflow-y-scroll">
      <h1 className="home-title">JOB BOARD</h1>
      <form
        className="searchbar w-4/6 h-[32px] lg:h-[40px]"
        onSubmit={submitHandler}
      >
        <input
          type="search"
          placeholder="Enter search"
          className="w-full sm:w-5/6"
          name="search"
          defaultValue={route.query.s}
        />
        <button className="hidden lg:block lg:w-1/6" type="submit">
          Search
        </button>
        <div className="home-filter-btn p-2 center-element lg:hidden">
          <select onChange={changeHandler} defaultValue={route.query.category}>
            <option value="all" onClick={(e) => e.currentTarget.value}>
              All
            </option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
          </select>
        </div>
      </form>

      <div className="w-full lg:container lg:flex lg:gap-5 min-h-[700px]">
        <div className="home-filter hidden lg:block lg:w-1/5 lg:h-[360px] lg:p-4 shadow">
          <Filter />
        </div>
        <div className="home-joblist mx-auto w-5/6 lg:w-4/5">
          {showJobs &&
            showJobs.map(
              (job: JobType, index: number): JSX.Element => (
                <Link href={`jobs/${job._id}`} key={index}>
                  <JobCard {...job} />
                </Link>
              )
            )}
        </div>
      </div>
      <Pagination />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps(context: { query: any }) {
  const { query } = context;
  try {
    const response = await fetch(
      query.category
        ? `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/job/filter/?category=${
            query.category
            // }&search=${query.s ? query.s : ""}`
          }&search=${query.s ? query.s : ""}&pages=${
            query.page ? query.page : 1
          }`
        : `${
            process.env.NEXT_PUBLIC_JOBSITE_HOST
            // }/job/filter/?category=all&search=${query.s ? query.s : ""}`
          }/job/filter/?category=all&search=${query.s ? query.s : ""}&pages=${
            query.page ? query.page : 1
          }`
    );
    const filtered = await response.json();

    return {
      props: {
        jobs: filtered,
      },
    };
  } catch (error) {
    return {
      props: {
        jobs: [],
      },
    };
  }
}
