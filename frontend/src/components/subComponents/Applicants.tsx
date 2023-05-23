import { ApplicationType, UserType } from "@/util/types";
import { useEffect, useState } from "react";

interface PropType {
  selectedJobId: string | undefined;
  setActiveBtn: React.Dispatch<
    React.SetStateAction<
      "profile" | "posted" | "applied" | "history" | "applicants" | "applicant"
    >
  >;
  setSelectedApplicationId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

interface ApplicantType extends Omit<ApplicationType, "userId"> {
  userId: UserType;
}

export default function Applicants({
  selectedJobId,
  setActiveBtn,
  setSelectedApplicationId,
}: PropType) {
  const [applicants, setApplicants] = useState<ApplicantType[] | undefined>();

  useEffect(() => {
    try {
      const getJobApplicants = async () => {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/application/jobId/${selectedJobId}`
        ).then((res) => res.json());
        setApplicants(result);
      };
      getJobApplicants();
    } catch (error) {
      console.log(error);
    }
  }, [selectedJobId]);
  console.log("applicants", applicants);

  function showSingleApplicant(applicationId: string | undefined) {
    console.log("single applicant go", applicationId);
    setSelectedApplicationId(applicationId);
    setActiveBtn("applicant");
  }

  return (
    <div className="applicants-page">
      applicants for job
      {applicants?.map((applicant, i) => (
        <div
          key={i}
          className="applicants-card border-2 border-solid border-black"
          onClick={() => showSingleApplicant(applicant._id)}
        >
          <div>{applicant.userId.firstName}</div>
          <div>{applicant.createdDate}</div>
        </div>
      ))}
    </div>
  );
}
