import { JobType } from "@/util/types";

export default function JobCard(props: JobType): JSX.Element {
  return (
    <div className="jobcard flex items-center gap-4 shadow-md py-2">
      <div className="jobcard-image invisible sm:visible sm:flex sm:w-[40px] sm:h-[40px] sm:ml-3 sm:rounded-full">
        J
      </div>
      <div className="jobcard-details w-5/6">
        <h1 className="jobcard-title">{props.title}</h1>
        <p className="jobcard-description">
          {props.description?.split(" ").slice(0, 8).join(" ")}...
        </p>
        <span className="jobcard-wage">${props.wage}</span>
      </div>
    </div>
  );
}
