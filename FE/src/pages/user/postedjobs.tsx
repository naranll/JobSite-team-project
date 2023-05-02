import JobCard from "@/components/JobCard";
import {useUserContext} from "@/context/UserContext";
import {JobType} from "@/util/types";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function PostedJob(): JSX.Element {
  const [postedJobs, setPostedJobs] = useState<JobType[]>([]);
  const {currentUser} = useUserContext();

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
      console.log("error fetchong posted jobs", error);
    }
  }, [currentUser?._id, setPostedJobs]);

  return (
    <div>
      {postedJobs[0] &&
        postedJobs.map((job, i) => (
          <Link href={`../jobs/${job._id}`} key={i}>
            <JobCard {...job} />
          </Link>
        ))}
    </div>
  );
}
