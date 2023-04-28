import React from "react";
import styles from "../styles/addjob.module.css";
import { useRouter } from "next/router";
import { JobType } from "@/util/types";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

export default function AddJob(): JSX.Element {
  const { user } = useUserContext();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function submitHandler(event: any): void {
    event.preventDefault();

    const target = event.currentTarget.elements;

    const newJob: JobType = {
      postedBy: user?._id,
      title: target.title.value,
      description: target.description.value,
      payment: target.payment.value,
    };
    console.log("add new job working", newJob);
    axios
      .post("http://localhost:8008/job/add", newJob)
      .then((res) => {
        if (res.data.success) {
          router.push("/success");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {user ? (
        <div className={styles.add_job_page}>
          <button className={styles.btn}>Back</button>
          <form className={styles.job_form} onSubmit={submitHandler}>
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
            <button className={styles.btn}>SUBMIT</button>
          </form>
        </div>
      ) : (
        <div>anon pls... login to post job</div>
      )}
    </>
  );
}
