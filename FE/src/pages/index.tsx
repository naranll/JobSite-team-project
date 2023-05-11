import Filter from "@/components/Filter";
import JobCard from "@/components/JobCard";
import {JobType} from "@/util/types";
import Link from "next/link";

export default function Home(props: {jobs: JobType[]}): JSX.Element {
  const {jobs} = props;
<<<<<<< Updated upstream

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function changeHandler(e: any): void {
    console.log("filter", e.currentTarget.value);
  }
=======
  const route = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function changeHandler(e: any): void {
    console.log("filter", e.currentTarget.value);
    if(e.currentTarget.value.trim()==="") {
      route.query.s =  e.currentTarget.value
        return;
      }
    console.log("route",route)
    route.query.s =  e.currentTarget.value
    route.push(route)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // function submitHandler(e: any): void {
  //   e.preventDefault();
  //   console.log("search", e.target.search.value)
  //   if(e.target.search.value.trim()==="") {
  //   route.push({query : {categories : "all"}})
  //     return;
  //   }
  //   route.query.s = e.target.search.value
  // }
 
    console.log(jobs);
>>>>>>> Stashed changes

  return (
    <div className="home-page flex flex-col items-center gap-3 overflow-y-scroll">
      <h1 className="home-title">JOB BOARD</h1>
      {/* <form className="searchbar w-4/6 h-[32px] lg:h-[40px]" onSubmit={submitHandler}> */}
      <form className="searchbar w-4/6 h-[32px] lg:h-[40px]">
        <input
          type="search"
          placeholder="Enter search"
          className="w-full sm:w-5/6"
          name="search"
          onChange={changeHandler}
        />
        <button className="hidden lg:block lg:w-1/6" type="submit">Search</button>

        <div className="home-filter-btn p-2 center-element lg:hidden">
          <select onChange={changeHandler}>
            <option value="all" onClick={(e)=>(e.currentTarget.value)}>All</option>
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

<<<<<<< Updated upstream
export async function getStaticProps() {
  try {
    const response = await fetch("http://localhost:8008/job/all");
    const jobs = await response.json();
=======
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps(context: { query: any}) {
  console.log(context);
  const { query } = context;
  try {
    const response = await fetch(`http://localhost:8008/job/filter/?category=${query.category}&search=${query.s?query.s:""}`);
    const filtered = await response.json();

    // console.log("this is filtered jobs",filtered);
>>>>>>> Stashed changes
    return {
      props: {
        jobs: jobs,
      },
    };
  } catch (error) {
    console.log("error:", error);
  }
}
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
