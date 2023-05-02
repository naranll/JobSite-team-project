import React, { useState } from "react";
import styles from "../styles/addjob.module.scss";
import { JobType } from "@/util/types";
import axios from "axios";
import { useUserContext } from "../context/UserContext";
import Message from "@/components/MessegeModal";

export default function AddJob(): JSX.Element {
  const { currentUser } = useUserContext();
  const [modal,setModal]=useState<boolean>(false)

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
    console.log("add new job working", newJob);
    axios
      .post("http://localhost:8008/job/add", newJob)
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          setModal(true)
          
        } 
      }) 
      .catch((err) => console.log(err));
  }

  return (
    <>
      {currentUser ? (
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

            <button className={styles.btn} >SUBMIT</button>


          </form>
          {modal&&<Message setModal={setModal}/>}
        </div>
      ) : (
        <div>anon pls... login to post job</div>
      )}
    </>
  );
}
