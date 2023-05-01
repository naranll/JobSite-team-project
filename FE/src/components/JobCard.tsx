import Card from "../styles/JobCard.module.css";
import { JobType } from "@/util/types";
import { AppliedJobsType } from "@/util/types";
import { AppliedType } from "@/pages/user/appliedjobs";

export default function JobCard(props: JobType): JSX.Element {
  return (
    <div className={Card.wrap}>
      <div className={Card.jobCard}>
        <h1 className={Card.cardTitle}>{props.title}</h1>
        <p className={Card.cardDisc}>{props.description}</p>
        <span className={Card.cardmoney}>{props.payment}</span>
      </div>
    </div>
  );
}
