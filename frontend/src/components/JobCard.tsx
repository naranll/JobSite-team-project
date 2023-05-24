import {JobType} from "@/util/types";
import moment from "moment";


export default function JobCard(props: JobType): JSX.Element {
  
let image : string | undefined;

if (typeof props.postedBy !== 'string' && props.postedBy?.image) {
  image = props.postedBy.image 
}

return (
    <div className="jobcard flex items-center gap-4 shadow-md py-2">
      <div className="jobcard-image invisible sm:visible sm:flex sm:w-[40px] sm:h-[40px] sm:ml-3 sm:rounded-full">
      <picture>
          {image ? (
            <img className="rounded-full w-[40px] h-[40px] bg-white" src={image} alt="postedBy" />
          ) : (
            <img className="rounded-full w-[40px] h-[40px] bg-white" src={'https://firebasestorage.googleapis.com/v0/b/jobsite-385401.appspot.com/o/PngItem_1503945.png?alt=media&token=4d4812fc-a12a-41c7-abe4-b0036bf2abca'} alt="postedBy" />
          )}
        </picture>
      </div>
      <div className="jobcard-details w-5/6">
        <div className="jobcard-header">
          <h1 className="jobcard-title">{props.title}</h1>
          <div className="jobcard-date">
            {moment(props.createdDate).calendar()}
          </div>
        </div>
        <p className="jobcard-description">
          {props.description && props.description.split(" ").slice(0, 8).join(" ")}...
        </p>
        <span className="jobcard-wage">${props.wage}</span>
      </div>
    </div>
  );
}
