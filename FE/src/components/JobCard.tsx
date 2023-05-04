import { JobType } from "@/util/types";

export default function JobCard(props: JobType): JSX.Element {
  return (
    <div>
      <div className="jobCard">
        <h1 className="cardTitle">{props.title}</h1>
        <p className="cardDisc">{props.description}</p>
        <span className="cardmoney">{props.payment}</span>
      </div>
    </div>
  );
}
