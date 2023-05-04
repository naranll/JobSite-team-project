import axios from "axios";
import React, { useState } from "react";
import { JobType } from "@/util/types";
import { useUserContext } from "../context/UserContext";
import SuccessModal from "@/components/SuccessModal";

export default function AddJob(): JSX.Element {
  const { currentUser } = useUserContext();
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function submitHandler(event: any): void {
    event.preventDefault();

    const target = event.currentTarget.elements;

    const newJob: JobType = {
      postedBy: currentUser?._id,
      title: target.title.value,
      description: target.description.value,
      payment: target.payment.value,
    };
    console.log("new job", newJob);
    axios
      .post("http://localhost:8008/job/add", newJob)
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setShowSuccessModal(true);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {currentUser ? (
        <div className="add_job_page">
          <button className="btn">Back</button>
          <form className="job_form" onSubmit={submitHandler}>
            <label>
              <p>Job Title</p>
              <input type="text" name="title" required />
            </label>

            <label>
              <p>Job Description</p>
              <textarea rows={5} name="description" required />
            </label>

            <label>
              <p> Payment</p>
              <input type="number" name="payment" required />
            </label>

            <button className="btn">SUBMIT</button>
          </form>
          {showSuccessModal && <SuccessModal setModal={setShowSuccessModal} />}
        </div>
      ) : (
        <div>login to post job</div>
      )}
    </>
  );
}
