import { JobType } from "@/util/types";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Style from "../../styles/JobCard.module.css";

export default function Job({ data: job }: { data: JobType }): JSX.Element {
  console.log("jobPage:", job);
  return (
    <div className={Style.wrap}>
      <div className={Style.jobCard}>
        <h1 className={Style.cardTitle}>{job.title}</h1>
        <p className={Style.cardDisc}>{job.description}</p>
        <span className={Style.cardmoney}>{job.payment}$</span>
        <p className={Style.contractType}>{job.contractType}</p>
      </div>
      <button onClick={() => console.log("clicked")} className={Style.button}>
        Apply
      </button>
    </div>
  );
}

export const getStaticPaths = async () => {
  const result = await fetch(`http://localhost:8080/jobs/job_id`);
  const resJob = await result.json();
  const paths = await resJob.map((id: { _id: string }) => ({
    params: { id: id._id },
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
  const res = await fetch(`http://localhost:8080/jobs/${params?.id}`);
  const resjson = await res.json();
  return {
    props: {
      data: resjson,
    },
  };
};
