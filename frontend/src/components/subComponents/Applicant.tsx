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
          `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/application/${selectedApplicationId}`
        ).then((res) => res.json());
        setApplicantInfo(result);
      };
      getApplicantInfo();
    } catch (error) {
      console.log(error);
    }
  }, [selectedApplicationId]);

  return (
    <>
      {applicantInfo && (
        <div>
          <div onClick={() => router.back()}>back</div>
          <h2>
            {applicantInfo.userId.firstName} {applicantInfo.userId.lastName}
          </h2>
        </div>
      )}
    </>
  );
}
