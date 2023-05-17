import {useUserContext} from "@/context/UserContext";
import Cookies from "js-cookie";
import {JobType} from "@/util/types";
// import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import JobCard from "../JobCard";

export default function Posted(): JSX.Element {
  const [postedJobs, setPostedJobs] = useState<JobType[]>();
  const {currentUser} = useUserContext();
  // const router = useRouter();

  useEffect(() => {
    console.log("user id", currentUser);
    try {
      const bearer = "Bearer " + Cookies.get("token");

      const getPostedJobs = async () => {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/job/posted/${currentUser?._id}`,
          {headers: {Authorization: bearer}}
        ).then((res) => res.json());
        console.log(result);
        setPostedJobs(result);
      };
      getPostedJobs();
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      {postedJobs?.map((job: JobType, i: number) => {
        // const jobApplicants = filterJobApplicant(job._id);
        console.log("posted jobs");
        return (
          <div key={i} className="postedjobs-jobcard">
            <JobCard {...job} />
          </div>
        );
      })}
    </div>
  );
}
