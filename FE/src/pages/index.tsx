/* eslint-disable @typescript-eslint/no-explicit-any */
import Filter from "@/components/Filter";
import JobCard from "@/components/JobCard";
import Pagenation from "@/components/Pagenation";
import { JobType } from "@/util/types";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home(props: { jobs: JobType[] }): JSX.Element {
  const { jobs } = props;
  const [showJobs, setShowJobs] = useState<any>();
  const route = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function changeHandler(e: any): void {
    console.log("filter", e.currentTarget.value);
    router.push({ query: { category: e.currentTarget.value } });
  }

  useEffect(()=>{
    setShowJobs(jobs)
  },[jobs])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function submitHandler(e: any): void {
    e.preventDefault();
    const searchValue = e.currentTarget.search.value.trim();

    console.log("hi", searchValue);

    if (searchValue === "") {
      router.push(router.pathname, undefined, { shallow: true });
    } else {
      router.push({ query: { ...router.query, s: searchValue } });
    }
  }

  return (
    <div className="home-page flex flex-col items-center gap-3 overflow-y-scroll">
      <h1 className="home-title">JOB BOARD</h1>
      <form className="searchbar w-4/6 h-[32px] lg:h-[40px]" onSubmit={submitHandler}>
        <input
          type="search"
          placeholder="Enter search"
          className="w-full sm:w-5/6"
          name="search"
          defaultValue={router.query.s}
        />
        <button className="hidden lg:block lg:w-1/6" type="submit">
          Search
        </button>

        <div className="home-filter-btn p-2 center-element lg:hidden">
          <select onChange={changeHandler} defaultValue={router.query.category}>
            <option value="all">All</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
          </select>
        </div>
      </form>
      <div className="w-full h-[32px] lg:container lg:flex lg:gap-5">
        <div className="home-filter hidden lg:block lg:w-1/5 lg:h-[360px] lg:p-4 shadow">
          <Filter />
        </div>
        <div className="home-joblist mx-auto w-5/6 lg:w-4/5">
          {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            // filtered != undefined && (
              showJobs?.map(
              (job: JobType, index: number): JSX.Element => (
                <Link href={`jobs/${job._id}`} key={index}>
                  <JobCard {...job} />
                </Link>
              )
            )
            // )
          }
        </div>
        <Pagenation setShowJobs={setShowJobs}/>
      </div>

    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps(context: { query: any }) {
  const { query } = context;

  // Extract the current page from the query parameters
  const currentPage = parseInt(query.page) || 1;
  const itemsPerPage = 10; // Set the number of items per page

  try {
    // Fetch the data for the current page based on the pagination parameters
    const response = await fetch(
      query.category ? `http://localhost:8008/job/filter/?category=${query.category}&search=${
        query.s ? query.s : ""
      }` : `http://localhost:8008/job/filter/?category=all&search=${
        query.s ? query.s : ""
      }`
    );
    const filtered = await response.json();

    console.log("this is filtered jobs", filtered);

    return {
      props: {
        jobs: filtered,
        currentPage: currentPage,
      },
    };
  } catch (error) {
    console.log("error:", error);
    return {
      props: {
        jobs: [],
        currentPage: currentPage,
      },
    };
  }
}
 
    export async function getStaticPaths() {
      try {
        const res = await fetch(`http://localhost:8008/job/pageNumber`);
        const resjson = await res.json();
        console.log("resjson ===> ", resjson);
    
        // Generate paths for each page
        const paths = [];
        for (let i = 1; i <= resjson.totalPages; i++) {
          paths.push({
            params: { page: i.toString() },
          });
        }
    
        return {
          paths,
          fallback: false,
        };
      } catch (error) {
        console.log("error:", error);
        return {
          paths: [],
          fallback: false,
        };
      }
    }