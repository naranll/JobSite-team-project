import {useEffect, useState} from "react";
import {useUserContext} from "../../../context/UserContext";
import {JobType} from "@/util/types";

interface AppliedType {
  jobId: JobType;
}

export default function AppliedJob(): JSX.Element {
  const [appliedJobs, setAppliedJobs] = useState<AppliedType[]>([]);
  const {user} = useUserContext();
  console.log("user", user);

  useEffect(() => {
    const getAppliedJobs = async () => {
      const response = await fetch(
        `http://localhost:8008/application/${user?._id}`
      );
      const jobs = await response.json();
      console.log("appliedjobs", jobs);
      setAppliedJobs(jobs);
    };

    getAppliedJobs();
  }, [user?._id]);

  return (
    <div>
      {appliedJobs[0] &&
        appliedJobs.map((job, i) => {
          console.log("job", job);
        })}
    </div>
  );
}
