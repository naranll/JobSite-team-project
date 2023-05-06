import { useEffect, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { JobType } from "@/util/types";
import JobCard from "@/components/JobCard";
import Link from "next/link";
// import "../../styles/applied.scss";
import { FcCancel } from "react-icons/fc";
import axios from "axios";
import { GetStaticProps, GetStaticPropsContext } from "next";

export interface AppliedType {
  map(
    arg0: (job: AppliedType, i: number) => JSX.Element
  ): import("react").ReactNode;
  jobId: JobType;
  state: string;
}

export default function AppliedJob(props: { data: AppliedType }): JSX.Element {
  // const [appliedJobs, setAppliedJobs] = useState<AppliedType[]>([]);
  const [deleted, setDeleted] = useState(false);
  const { currentUser } = useUserContext();
  console.log("props", props);
  console.log("user", currentUser);

  // useEffect(() => {
  //   try {
  //     const getAppliedJobs = async () => {
  //       const response = await fetch(
  //         `http://localhost:8008/application/${currentUser?._id}`
  //       );
  //       const jobs = await response.json();
  //       console.log("appliedjobs", jobs);
  //       setAppliedJobs(jobs);
  //     };
  //     getAppliedJobs();
  //   } catch (error) {
  //     console.log("error fetch", error);
  //   }
  // }, [currentUser?._id]);

  function handleWithdraw(jobId: string | undefined) {
    console.log("jobId", jobId);
    console.log("userId", currentUser?._id);
    const appInfo = {
      jobId: jobId,
      userId: currentUser?._id,
    };
    axios
      .delete(`http://localhost:8008/application/remove/${currentUser?._id}`, {
        data: appInfo,
      })
      .then((res) => {
        if (res.data.message) {
          setDeleted(true);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      {props.data.map((job: AppliedType, i: number) => (
        <div className="card" key={i}>
          <Link href={`../jobs/${job.jobId._id}`}>
            <JobCard {...job.jobId} />
          </Link>
          <div className="state">{job.state}</div>
          <div onClick={() => handleWithdraw(job.jobId._id)}>
            <FcCancel size={30} />
          </div>
        </div>
      ))}
      {deleted ? (
        <div>
          <p>application deleted successfully</p>
        </div>
      ) : null}
    </div>
  );
}

export const getStaticPaths = async () => {
  const result = await fetch(`http://localhost:8008/application/user_id`);
  const resultApp = await result.json();
  const paths = await resultApp.map((id: { _id: string }) => ({
    params: { id: id._id },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

interface ApplicationProps {
  data: AppliedType | null;
}

export const getStaticProps: GetStaticProps<ApplicationProps> = async ({
  params,
}: GetStaticPropsContext) => {
  const res = await fetch(`http://localhost:8008/application/${params?.id}`);
  const resJson = await res.json();
  return {
    props: {
      data: resJson,
    },
  };
};
