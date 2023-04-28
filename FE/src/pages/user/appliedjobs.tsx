import {useEffect, useState} from "react";
import {useUserContext} from "../../context/UserContext";
import {JobType} from "@/util/types";
import JobCard from "@/components/JobCard";
import Link from "next/link";

interface AppliedType {
  jobId: JobType;
}

export default function AppliedJob(): JSX.Element {
  const [appliedJobs, setAppliedJobs] = useState<AppliedType[]>([]);
  const {user} = useUserContext();
  console.log("user", user);

  useEffect(() => {
    try {
      const getAppliedJobs = async () => {
        const response = await fetch(
          `http://localhost:8008/application/${user?._id}`
        );
        const jobs = await response.json();
        //   console.log("appliedjobs", jobs);
        setAppliedJobs(jobs);
      };
      getAppliedJobs();
    } catch (error) {
      console.log("error fetch", error);
    }
  }, [user?._id]);

  console.log("appliedJobs", appliedJobs);
  return (
    <div>
      {appliedJobs[0] &&
        appliedJobs.map((job, i) => (
          <Link key={i} href={`../jobs/${job.jobId._id}`}>
            <JobCard {...job.jobId} />
          </Link>
        ))}
    </div>
  );
}
