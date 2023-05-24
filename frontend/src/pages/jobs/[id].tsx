import {JobType} from "@/util/types";
import {GetStaticProps, GetStaticPropsContext} from "next";
import {useUserContext} from "../../context/UserContext";
import axios from "axios";
import {useState, useEffect} from "react";
import SuccessModal from "@/components/SuccessModal";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import moment from "moment";

export default function Job({data: job}: {data: JobType}): JSX.Element {
  const {currentUser} = useUserContext();
  const [isApplied, setIsApplied] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const router = useRouter();

  const checkApplied = () => {
    const checkBody = {
      jobId: job._id,
      userId: currentUser?._id,
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/application/check`,
        checkBody
      )
      .then((res) => {
        if (res.data.message) {
          setIsApplied(true);
        }
      });
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    }
    checkApplied();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleApply() {
    const newApply = {jobId: job._id, userId: currentUser?._id};

    axios
      .post(`${process.env.NEXT_PUBLIC_JOBSITE_HOST}/application/add`, newApply)
      .then((res) => {
        if (res.data) {
          setShowSuccessModal(true);
        }
      })
      .catch(() => setIsApplied(true));
  }

  return (
    <>
      {currentUser && (
        <div className="jobpage flex flex-col md:flex-row-reverse gap-4 container px-4 py-2">
          <div className="jobpage-employer w-full md:w-1/4 md:h-[260px] p-4">
            <h2 className="jobpage-employer-title">Employer Info</h2>
          </div>
          <div className="jobpage-jobdetails w-full min-h-[600px] md:w-3/4 p-4">
            <div>
              <h1 className="jobpage-title">{job.title}</h1>
              <p>{moment(job.createdDate).calendar()}</p>
              <p className="jobpage-description">{job.description}</p>
              <p className="jobpage-contract">{job.contractType}</p>
              <p className="jobpage-contract">{job.wage}</p>
              <p className="jobpage-contract">{job.category}</p>
              <p className="jobpage-contract">{job.requirement}</p>
              <p className="jobpage-contract">{job.location}</p>
            </div>
            <button
              disabled={(currentUser._id === job.postedBy, isApplied === true)}
              onClick={handleApply}
              className={`w-full ${
                isApplied ? "text-black bg-gray-400 rounded-lg" : "btn-style"
              }`}
            >
              {isApplied ? "Applied" : "Apply"}
            </button>
          </div>

          {showSuccessModal && <SuccessModal setModal={setShowSuccessModal} />}
        </div>
      )}
    </>
  );
}

export const getStaticPaths = async () => {
  let paths = [];
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/job/job_id`
    );
    console.log("result:", result);
    const resJob = await result.json();
    paths = await resJob.map((id: {_id: string}) => ({
      params: {id: id._id},
    }));
  } catch (err) {
    console.log("error: ", err);
  }

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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/job/singleJob/${params?.id}`
  );
  const resjson = await res.json();
  return {
    props: {
      data: resjson,
    },
  };
};
