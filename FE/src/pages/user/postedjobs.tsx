import JobCard from "@/components/JobCard";
import { useUserContext } from "@/context/UserContext";
import { JobType } from "@/util/types";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ApplicantType {
  state: string;
  userId: UserType;
}

export default function PostedJob(): JSX.Element {
  const [postedJobs, setPostedJobs] = useState<JobType[]>([]);
  const { currentUser } = useUserContext();

  useEffect(() => {
    try {
      const getPostedJobs = async () => {
        const response = await fetch(
          `http://localhost:8008/job/posted/${currentUser?._id}`
        );
        const jobs = await response.json();
        setPostedJobs(jobs);
      };
      getPostedJobs();
    } catch (error) {
      console.log("error fetching posted jobs", error);
    }
  }, [currentUser?._id]);

  const getApplicants = async (jobId: string) => {
    const response = await fetch(
      `http://localhost:8008/application/applicants/${jobId}`
    );
    const applicants = await response.json();
    // console.log("applicants", typeof applicants);
    return applicants;
  };

  return (
    <div>
      {postedJobs[0] &&
        postedJobs.map((job, i) => {
          console.log("get applicants", getApplicants(job._id));
          return (
            <div key={i} className="flex border-2 border-solid border-black">
              <Link href={`../jobs/${job._id}`}>
                <JobCard {...job} />
              </Link>
              <div>applicant no.{}</div>
            </div>
          );
        })}
    </div>
  );
}
