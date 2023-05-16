/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useRef, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { JobType } from "@/util/types";
import JobCard from "@/components/JobCard";
import Link from "next/link";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
// import "../../styles/applied.scss";
import { FcCancel } from "react-icons/fc";
import axios from "axios";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";

export interface AppliedType {
  map(
    arg0: (job: AppliedType, i: number) => JSX.Element
  ): import("react").ReactNode;
  jobId: JobType;
  state: string;
}

export default function AppliedJob(props: { data: AppliedType }): JSX.Element {
  const [jobId, setJobId] = useState<string | undefined>();
  const [visible, setVisible] = useState(false);
  const { currentUser } = useUserContext();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toast = useRef<any>(null);
  console.log("props", props);
  console.log("user", currentUser);

  const showInfo = () => {
    toast.current.show({
      severity: "success",
      summary: "application deleted",
      detail: "your applicatiion to this job successfully canceled",
      life: 3000,
    });
  };

  function handleWithdraw() {
    console.log("jobId", jobId);
    console.log("userId", currentUser?._id);
    const appInfo = {
      jobId: jobId,
      userId: currentUser?._id,
    };
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/application/remove/${currentUser?._id}`,
        {
          data: appInfo,
        }
      )
      .then((res) => {
        if (res.data.message) {
          showInfo();
          router.reload();
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Toast ref={toast} />
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
              handleWithdraw();
              setVisible(false);
            }}
          >
            yes
          </Button>
          <Button onClick={() => setVisible(false)}>no</Button>
        </div>
      </Dialog>
      {props.data.map((job: AppliedType, i: number) => (
        <div className="card" key={i}>
          <Link className="w-4/5 p-3 " href={`../jobs/${job.jobId?._id}`}>
            <JobCard {...job.jobId} />
          </Link>
          <div className="state shadow-md ">{job.state}</div>
          <div
            className="cursor-pointer hover:bg-red-300 shadow-md rounded-full"
            onClick={() => {
              setVisible(true);
              setJobId(job.jobId?._id);
            }}
          >
            <FcCancel size={40} />
          </div>
        </div>
      ))}
    </div>
  );
}

export const getStaticPaths = async () => {
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/application/user_id`
  );
  const resultApp = await result.json();
  const paths = await resultApp.map((id: { _id: string }) => ({
    params: { id: id._id },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

interface ApplicationProps {
  data: AppliedType | null;
}

export const getStaticProps: GetStaticProps<ApplicationProps> = async ({
  params,
}: GetStaticPropsContext) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/application/${params?.id}`
  );
  const resJson = await res.json();
  return {
    props: {
      data: resJson,
    },
  };
};
