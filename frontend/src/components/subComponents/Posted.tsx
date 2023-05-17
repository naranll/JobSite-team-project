import {useUserContext} from "@/context/UserContext";
import Cookies from "js-cookie";
import {JobType} from "@/util/types";
// import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import JobCard from "../JobCard";
import {ApplicationType} from "@/util/types";

export default function Posted(): JSX.Element {
  const [postedJobs, setPostedJobs] = useState<JobType[]>();
  const {currentUser} = useUserContext();
  // const router = useRouter();
  const bearer = "Bearer " + Cookies.get("token");

  useEffect(() => {
    try {
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

  async function getJobApplicants(jobId: string | undefined) {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/application/applicants/${jobId}`,
      {headers: {Authorization: bearer}}
    ).then((res) => res.json());
    console.log("applicants", result);
    return result;
  }

  return (
    <div className="postedjobs-list">
      {postedJobs?.map((job: JobType, i: number) => {
        // const jobApplicants = filterJobApplicant(job._id);
        const jobApplicants = getJobApplicants(job._id);
        console.log("posted job applicants", jobApplicants);
        return (
          <div key={i} className="postedjobs-jobcard">
            <JobCard {...job} />
            <div className="postedjobs-applicants-count">
              {jobApplicants.length()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
