/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef, SetStateAction } from "react";
import JobCard from "../JobCard";
import { JobType } from "@/util/types";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";
import { FcCancel } from "react-icons/fc";
import { Button } from "@chakra-ui/react";
import { Dialog } from "primereact/dialog";

export interface AppliedType {
  _id: SetStateAction<AppliedType[] | undefined>;
  map(
    arg0: (job: AppliedType, i: number) => JSX.Element
  ): import("react").ReactNode;
  jobId: JobType;
  state: string;
}

export default function Applied(props:any): JSX.Element {
  const [appliedJobs, setAppliedJobs] = useState<AppliedType[]>()
  const [toggle, setToggle] = useState(false)
  const [visible, setVisible] = useState(false)
  const [jobId, setJobId] = useState<string | undefined>()
  const { currentUser } = useUserContext();
  const toast = useRef<any>(null)
  const showInfo = () => {
    toast.current.show({
      severity: "success",
      summary: "application deleted",
      detail: "your applicatiion to this job successfully canceled",
      life: 3000,
    });
  };

  const handleToggle = () => {
    setToggle(!toggle)
  }

  function handleWithdraw(id: string | undefined) {
    console.log("userId", currentUser?._id);
    const appInfo = {
      jobId: jobId,
      userId: currentUser?._id,
    };
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_JOBSITE_HOST}application/remove/${currentUser?._id}`,
        {
          data: appInfo,
        }
      )
      .then((res) => {
        handleToggle;
        if (res.data.message) {
          showInfo();

          
        }
      })
      .catch((err) => console.log(err));
    const result = appliedJobs?.filter((job:AppliedType)=> job.jobId._id !== id)
    setAppliedJobs(result)
  }

  useEffect(()=>{
    const getApplication = async (id: string | undefined) => {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_JOBSITE_HOST}application/${id}`)
      setAppliedJobs(result.data)

    }
    getApplication(currentUser?._id)
  },[currentUser, toggle])
  return (
    <div className="border-2">
      
      {
      appliedJobs?.map((job: AppliedType, i: number)=> (
        <div className="m-5" key={i}>
          <JobCard {...job.jobId} />
          <div className="state shadow-md ">{job.state}</div>
      <Dialog
        className="text-center"
        header="Warning"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <div className="p-3">delete application to this job? </div>
        <div className="flex justify-center gap-3">
          <Button
            onClick={() => {
              handleWithdraw(job.jobId._id);
              setVisible(false);
              console.log(job
                )
            }}
          >
            yes
          </Button>
          <Button onClick={() => setVisible(false)}>no</Button>
        </div>
      </Dialog>
          <div
            className="cursor-pointer hover:bg-red-300 shadow-md rounded-full"
            onClick={() => {
              setVisible(true);
              setJobId(job.jobId._id);
            }}
          >
            <FcCancel size={40} />
          </div>
        </div>
      ))
      }
    </div>
  );
}