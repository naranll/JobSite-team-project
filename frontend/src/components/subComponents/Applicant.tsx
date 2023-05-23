// import { ApplicationType, UserType } from "@/util/types";
import { useEffect } from "react";

interface PropType {
  selectedApplicationId: string | undefined;
}

// interface ApplicantsType extends Omit<ApplicationType, "userId"> {
//   userId: UserType;
// }

export default function Applicant({ selectedApplicationId }: PropType) {
  useEffect(() => {
    try {
      const getApplicantInfo = async () => {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/application/${selectedApplicationId}`
        ).then((res) => res.json());
        console.log("resss", result);
      };
      getApplicantInfo();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <div>back</div>
      applicant info and set state
    </div>
  );
}
