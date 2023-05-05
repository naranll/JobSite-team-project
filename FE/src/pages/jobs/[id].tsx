import { JobType } from "@/util/types";
import { GetStaticProps, GetStaticPropsContext } from "next";
// import "../../styles/jobcard.scss";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";
import { useState, useEffect } from "react";
import SuccessModal from "@/components/SuccessModal";
import { useRouter } from "next/router";

export default function Job({ data: job }: { data: JobType }): JSX.Element {
  const { currentUser } = useUserContext();
  const [isApplied, setIsApplied] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);
  // console.log("jobPage:", job);

  function handleApply() {
    console.log("Job Id", job._id);
    console.log("User id", currentUser?._id);

    const newApply = { jobId: job._id, userId: currentUser?._id };

    axios
      .post("http://localhost:8008/application/add", newApply)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setShowSuccessModal(true);
        }
      })
      .catch(() => setIsApplied(true));
  }

  return (
    <div>
      {currentUser ? (
        <div>
          <div className="jobCard">
            <h1 className="cardTitle">{job.title}</h1>
            <p className="cardDisc">{job.description}</p>
            <span className="cardmoney">{job.wage}$</span>
            <p className="contractType">{job.contractType}</p>
          </div>
          <button
            disabled={currentUser._id === job.postedBy}
            onClick={handleApply}
            className="button"
          >
            Apply
          </button>
          {isApplied && (
            <p className="text-red-500">you are already applied to this job</p>
          )}
          {showSuccessModal && <SuccessModal setModal={setShowSuccessModal} />}
        </div>
      ) : (
        <div>Please login to see content</div>
      )}
    </div>
  );
}

export const getStaticPaths = async () => {
  const result = await fetch(`http://localhost:8008/job/job_id`);
  const resJob = await result.json();
  const paths = await resJob.map((id: { _id: string }) => ({
    params: { id: id._id },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

interface JobProps {
  data: JobType | null;
}

export const getStaticProps: GetStaticProps<JobProps> = async ({
  params,
}: GetStaticPropsContext) => {
  const res = await fetch(`http://localhost:8008/job/${params?.id}`);
  const resjson = await res.json();
  return {
    props: {
      data: resjson,
    },
  };
};
