import JobCard from "@/components/JobCard";
import { JobType, UserType } from "@/util/types";
import Link from "next/link";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

type ApplicantType = {
  jobId: string;
  userId: UserType;
  state: string;
};
const token = Cookies.get("token");

export default function PostedJob(): JSX.Element {
  const [postedJobs, setPostedJobs] = useState<JobType[]>([]);
  const [jobApplicants, setJobApplicants] = useState<ApplicantType[]>([]);

  useEffect(() => {
    if (token) {
      const currentUser: UserType = jwtDecode(token);
      const getPostedJobs = async () => {
        const response = await fetch(
          `http://localhost:8008/job/posted/${currentUser._id}`
        );
        const jobs = await response.json();
        setPostedJobs(jobs);
        getApplicants(jobs);
      };
      getPostedJobs();
    } else {
      console.log("error fetching posted jobs");
    }
  }, []);

  function getApplicants(jobs: JobType[]) {
    jobs.map((job) => {
      fetch(`http://localhost:8008/application/applicants/${job._id}`)
        .then((res) => res.json())
        .then((res) => setJobApplicants(res));
    });
  }

  function filterJobApplicant(oneJobId: string | undefined) {
    return jobApplicants.filter((application) => application.jobId == oneJobId);
  }

  return (
    <div>
      {postedJobs.map((job: JobType, i: number) => {
        const allApplicants = filterJobApplicant(job._id);
        return (
          <div key={i} className="flex border-2 border-solid border-black">
            <Link href={`../jobs/${job._id}`}>
              <JobCard {...job} />
            </Link>
            <div>
              <div>applicants:{allApplicants.length}</div>
              <div className="button-style">View Applicants</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
