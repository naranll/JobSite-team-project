import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { JobType } from "@/util/types";
import JobCard from "@/components/JobCard";
import Link from "next/link";
import styles from "../../styles/appliedJob.module.css";

export interface AppliedType {
  jobId: JobType;
  state: string;
}

export default function AppliedJob(): JSX.Element {
  const [appliedJobs, setAppliedJobs] = useState<AppliedType[]>([]);
  const { currentUser } = useUserContext();
  console.log("user", currentUser);

  useEffect(() => {
    try {
      const getAppliedJobs = async () => {
        const response = await fetch(
          `http://localhost:8008/application/${currentUser?._id}`
        );
        const jobs = await response.json();
        //   console.log("appliedjobs", jobs);
        setAppliedJobs(jobs);
      };
      getAppliedJobs();
    } catch (error) {
      console.log("error fetch", error);
    }
  }, [currentUser?._id]);

  console.log("appliedJobs", appliedJobs);
  return (
    <div className={styles.wrap}>
      {appliedJobs[0] &&
        appliedJobs.map((job, i) => (
          <div className={styles.card} key={i}>
            <Link href={`../jobs/${job.jobId._id}`}>
              <JobCard {...job.jobId} />
            </Link>
            <div className={styles.state}>{job.state}</div>
          </div>
        ))}
    </div>
  );
}
