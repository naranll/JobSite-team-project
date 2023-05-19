import {useUserContext} from "@/context/UserContext";

import {ApplicationType, JobType} from "@/util/types";
import {useEffect, useState} from "react";
import JobCard from "../JobCard";

export default function Posted(): JSX.Element {
  const [postedJobs, setPostedJobs] = useState<JobType[]>();
  const [jobsApplicants, setJobsApplicants] = useState<ApplicationType[]>();
  const {currentUser, token} = useUserContext();

  useEffect(() => {
    if (currentUser) {
      try {
        console.log(currentUser);
        const getPostedJobs = async () => {
          const result = await fetch(
            `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/job/posted/${currentUser._id}`,
            {headers: {Authorization: `"Bearer ${token}`}}
          ).then((res) => res.json());
          setPostedJobs(result);
          getJobsApplicants(result);
        };
        getPostedJobs();
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getJobsApplicants = (jobs: JobType[]) => {
    jobs.map((job) => {
      fetch(
        `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/application/applicants/${job._id}`
      )
        .then((res) => res.json())
        .then((res) => setJobsApplicants(res));
    });
  };

  function getSingleJobApplicants(
    jobId: string | undefined
  ): ApplicationType[] | undefined {
    return jobsApplicants?.filter(
      (singleJobApplicants) => singleJobApplicants.jobId === jobId
    );
  }

  return (
    <div className="postedjobs-list">
      {postedJobs?.map((job: JobType, i: number) => {
        const jobApplicants = getSingleJobApplicants(job._id);
        return (
          <div key={i} className="postedjobs-jobcard">
            <div className="w-4/5 sm:5/6">
              <JobCard {...job} />
            </div>
            <div className="postedjobs-applicants h-full w-1/5 sm:w-1/6">
              <div className="postedjobs-applicants-count">
                {jobApplicants?.length}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
