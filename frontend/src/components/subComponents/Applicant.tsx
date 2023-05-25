import { ApplicationType, UserType } from "@/util/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface PropType {
  selectedApplicationId: string | undefined;
}

interface ApplicantsType extends Omit<ApplicationType, "userId"> {
  userId: UserType;
}

export default function Applicant({ selectedApplicationId }: PropType) {
  const router = useRouter();
  const [applicantInfo, setApplicantInfo] = useState<
    ApplicantsType | undefined
  >(undefined);

  useEffect(() => {
    try {
      const getApplicantInfo = async () => {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/application/id/${selectedApplicationId}`
        ).then((res) => res.json());
        setApplicantInfo(result);
      };
      getApplicantInfo();
    } catch (error) {
      console.log(error);
    }
  }, [selectedApplicationId]);

  function applicantHandler(prop: string) {
    console.log("applicnt handler");
    fetch(
      `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/application/${selectedApplicationId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          newState: prop,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => console.log("accept res", res));
  }

  return (
    <>
      {applicantInfo && (
        <div className="applicant-page">
          <div
            onClick={() => router.back()}
            className="border-2 border-solid border-black"
          >
            back
          </div>
          <div className="applicant-info">
            <h2>
              {applicantInfo.userId.firstName} {applicantInfo.userId.lastName}
            </h2>
            <div>Skills: {applicantInfo.userId.skills}</div>
          </div>
          <div
            onClick={() => applicantHandler("ACCEPTED")}
            className="border-2 border-solid border-lime-500"
          >
            Accept
          </div>
          <div
            onClick={() => applicantHandler("REJECTED")}
            className="border-2 border-solid border-rose-500"
          >
            Reject
          </div>
        </div>
      )}
    </>
  );
}
