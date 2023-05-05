import {JobType} from "@/util/types";

export default function JobCard(props: JobType): JSX.Element {
  return (
    <div className="jobcard flex items-center gap-4 drop-shadow-sm">
      <div className="jobcard-image invisible sm:visible sm:flex sm:w-[40px] sm:h-[40px] sm:rounded-full">
        J
      </div>
      <div className="jobcard-details w-5/6">
        <h1 className="jobcard-title">{props.title}</h1>
        <p className="jobcard-description">
          {props.description.slice(0, 150)}...
        </p>
        <span className="jobcard-wage">${props.payment}</span>
      </div>
    </div>
  );
}
