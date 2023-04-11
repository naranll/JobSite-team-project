import Card from "../styles/JobCard.module.css";
import { JobType } from "@/util/Types";

export default function JobCard(prop: JobType): JSX.Element {
  return (
    <div className={Card.wrap}>
      <div className={Card.jobCard}>
        <h1 className={Card.cardTitle}>{prop.title}</h1>
        <p className={Card.cardDisc}>{prop.description}</p>
        <span className={Card.cardmoney}>{prop.payment}</span>
      </div>
    </div>
  );
}
