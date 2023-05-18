import {useUserContext} from "@/context/UserContext";
import Cookies from "js-cookie";
import {JobType} from "@/util/types";
import {useEffect, useState} from "react";
import JobCard from "../JobCard";

export default function Posted(): JSX.Element {
  const [postedJobs, setPostedJobs] = useState<JobType[]>();
  const {currentUser} = useUserContext();
  const bearer = "Bearer " + Cookies.get("token");

  useEffect(() => {
    try {
      const getPostedJobs = async () => {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/job/posted/${currentUser?._id}`,
          {headers: {Authorization: bearer}}
        ).then((res) => res.json());
        console.log("fetch result", result);
        setPostedJobs(result);
      };
      getPostedJobs();
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // async function getJobApplicants(jobId: string | undefined) {
  //   const result = await fetch(
  //     `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/application/applicants/${jobId}`,
  //     {headers: {Authorization: bearer}}
  //   ).then((res) => res.json());
  //   console.log("applicants", result);
  //   return [result];
  // }

  return (
    <div className="postedjobs-list">
      {postedJobs?.map((job: JobType, i: number) => (
        <div key={i} className="postedjobs-jobcard">
          <JobCard {...job} />
          <div className="postedjobs-applicants-count">{}</div>
        </div>
      ))}
    </div>
  );
}
