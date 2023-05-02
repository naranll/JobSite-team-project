import Card from "../styles/JobCard.module.scss";
import { JobType } from "@/util/types";

<<<<<<< HEAD
export default function JobCard(props: JobType): JSX.Element {
  return (
    <div className={Card.wrap}>
      <div className={Card.jobCard}>
        <h1 className={Card.cardTitle}>{props.title}</h1>
        <p className={Card.cardDisc}>{props.description}</p>
        <span className={Card.cardmoney}>{props.payment}</span>
=======
export default function JobCard(prop: JobType): JSX.Element {
  return (
    <div className={Card.wrap}>
      <div className={Card.jobCard}>
        <h1 className={Card.cardTitle}>{prop.title}</h1>
        <p className={Card.cardDisc}>{prop.description}</p>
        <span className={Card.cardmoney}>{prop.payment}</span>
>>>>>>> 92ab35f (unfinished apllication state)
      </div>
    </div>
  );
}
