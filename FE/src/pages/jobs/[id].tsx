import {JobType} from "@/util/types";
import {GetStaticProps, GetStaticPropsContext} from "next";
import Style from "../../styles/JobCard.module.css";
import {useUserContext} from "../../../context/UserContext";
import axios from "axios";

export default function Job({data: job}: {data: JobType}): JSX.Element {
  const {user} = useUserContext();
  console.log("jobPage:", job);

  function handleApply() {
    console.log("Job Id", job._id);
    console.log("User id", user?._id);

    const newApply = { jobId: job._id, userId: user?._id };

    axios
      .post("http://localhost:8008/application/add", newApply)
      .then((res) => console.log(res));
  }
  return (
    <div>
      {user ? (
        <div className={Style.wrap}>
          <div className={Style.jobCard}>
            <h1 className={Style.cardTitle}>{job.title}</h1>
            <p className={Style.cardDisc}>{job.description}</p>
            <span className={Style.cardmoney}>{job.payment}$</span>
            <p className={Style.contractType}>{job.contractType}</p>
          </div>
          <button onClick={handleApply} className={Style.button}>
            Apply
          </button>
        </div>
      ) : (
        <div>Please login to see content</div>
      )}
    </div>
  );
}

export const getStaticPaths = async () => {
  const result = await fetch(`http://localhost:8008/job/job_id`);
  const resJob = await result.json();
  const paths = await resJob.map((id: {_id: string}) => ({
    params: {id: id._id},
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

interface JobProps {
  data: JobType | null;
}

export const getStaticProps: GetStaticProps<JobProps> = async ({
  params,
}: GetStaticPropsContext) => {
  const res = await fetch(`http://localhost:8008/job/${params?.id}`);
  const resjson = await res.json();
  return {
    props: {
      data: resjson,
    },
  };
};
