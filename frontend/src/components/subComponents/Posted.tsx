import { useUserContext } from "@/context/UserContext";
import { ApplicationType, JobType } from "@/util/types";
import { useEffect, useState } from "react";
import JobCard from "../JobCard";

interface PropType {
  setActiveBtn: React.Dispatch<
    React.SetStateAction<
      "profile" | "posted" | "applied" | "history" | "applicants" | "applicant"
    >
  >;
  setSelectedJobId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function Posted({
  setActiveBtn,
  setSelectedJobId,
}: PropType): JSX.Element {
  const [postedJobs, setPostedJobs] = useState<JobType[]>();
  const [jobsApplicants, setJobsApplicants] = useState<ApplicationType[]>();
  const { currentUser, token } = useUserContext();

  useEffect(() => {
    if (currentUser) {
      try {
        const getPostedJobs = async () => {
          const result = await fetch(
            `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/job/posted/${currentUser._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
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
        `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/application/jobId/${job._id}`
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

  function showEditJob(jobId: string | undefined) {
    console.log("jobId", jobId);
  }

  function showJobApplicants(jobId: string | undefined) {
    setSelectedJobId(jobId);
    setActiveBtn("applicants");
    console.log("job applicants", jobId);
  }

  return (
    <div className="postedjobs-list p-2">
      {postedJobs?.map((job: JobType, i: number) => {
        const jobApplicants = getSingleJobApplicants(job._id);
        return (
          <div key={i} className="postedjobs-jobcard">
            <div
              className="w-4/5 sm:w-5/6 pr-1"
              onClick={() => showEditJob(job._id)}
            >
              <JobCard {...job} />
            </div>
            <div className="postedjobs-applicants h-full w-1/5 sm:w-1/6">
              <div
                className="postedjobs-applicants-count"
                onClick={() => showJobApplicants(job._id)}
              >
                {jobApplicants?.length}
                <p className="text-xs">applicants</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
