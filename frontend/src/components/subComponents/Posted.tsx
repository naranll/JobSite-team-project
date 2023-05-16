// import { useUserContext } from "@/context/UserContext";
// import { JobType } from "@/util/types";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

export default function Posted(): JSX.Element {
  // const [jobs, setJobs] = useState<JobType[]>();
  // const { currentUser, token } = useUserContext();
  // const router = useRouter();

  // useEffect(() => {
  //   const fetchJobs = async (id: string | undefined) => {
  //     console.log("user id :", id);
  //     const result = axios.get(
  //       `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/job/posted/${currentUser?._id}`
  //     );
  //     console.log("job result :", result);
  //   };
  //   fetchJobs(currentUser?._id);
  // }, []);

  return <div>Posted Jobs</div>;
}
