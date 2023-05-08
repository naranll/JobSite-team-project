import JobCard from "@/components/JobCard";
import {JobType, UserType} from "@/util/types";
import Link from "next/link";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {useEffect, useState} from "react";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";

// type ApplicantType = {
//   jobId: string;
//   userId: UserType;
//   state: string;
// };

export default function PostedJob({
  data: postedjob,
}: {
  data: JobType;
}): JSX.Element {
  console.log("test", postedjob);
  // const [postedJobs, setPostedJobs] = useState<JobType[]>([]);
  // const [jobApplicants, setJobApplicants] = useState<ApplicantType[]>([]);

  // useEffect(() => {
  //   if (token) {
  //     const currentUser: UserType = jwtDecode(token);
  //     const getPostedJobs = async () => {
  //       const response = await fetch(
  //         `http://localhost:8008/job/posted/${currentUser._id}`
  //       );
  //       const jobs = await response.json();
  //       setPostedJobs(jobs);
  //       getApplicants(jobs);
  //     };
  //     getPostedJobs();
  //   } else {
  //     console.log("error fetching posted jobs");
  //   }
  // }, []);

  // function getApplicants(jobs: JobType[]) {
  //   jobs.map((job) => {
  //     fetch(`http://localhost:8008/application/applicants/${job._id}`)
  //       .then((res) => res.json())
  //       .then((res) => setJobApplicants(res));
  //   });
  // }

  // function filterJobApplicant(oneJobId: string | undefined) {
  //   return jobApplicants.filter((application) => application.jobId == oneJobId);
  // }

  return (
    <div>i</div>
    // <div>
    //   "string"
    //   {postedJobs.map((job: JobType, i: number) => {
    //     // const allApplicants = filterJobApplicant(job._id);
    //     console.log("i");
    //     return (
    //       <div key={i} className="w-full flex">
    //         <Link href={`../postedjobs/${job._id}`}>
    //           <JobCard {...job} />
    //         </Link>
    //         {/* <div className="border-2 border-solid border-black">
    //           <div>applicants:{allApplicants.length}</div>
    //           <div className="btn-style w-[80px]">View</div>
    //         </div> */}
    //       </div>
    //     );
    //   })}
    // </div>
  );
}

export const getStaticPaths = async () => {
  const result = await fetch(`http://localhost:8008/user/user_id`);
  const user = await result.json();
  const paths = await user.map((id: {_id: string}) => ({
    params: {id: id._id},
  }));
  return {
    paths,
    fallback: true,
  };
};

interface JobProps {
  data: JobType | null;
}

export const getStaticProps: GetStaticProps<JobProps> = async ({
  params,
}: GetStaticPropsContext) => {
  try {
    console.log("params", params);
    const result = await fetch(`localhost:8008/job/posted/${params?.id}`);
    const postedjobs = await result.json();
    return {
      props: {
        data: postedjobs,
      },
    };
  } catch (error) {
    console.log("params", params);
    return {
      props: {
        data: {},
      },
    };
  }
};
