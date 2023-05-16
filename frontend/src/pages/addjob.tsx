import axios from "axios";
import React, { useState, useEffect } from "react";
import { JobType } from "@/util/types";
import { useUserContext } from "../context/UserContext";
import SuccessModal from "@/components/SuccessModal";
import { useRouter } from "next/router";

export default function AddJob(): JSX.Element {
  const { currentUser } = useUserContext();
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function submitHandler(event: any): void {
    event.preventDefault();

    const target = event.currentTarget.elements;

    const newJob: JobType = {
      postedBy: currentUser?._id,
      title: target.title.value,
      description: target.description.value,
      wage: Number(target.wage.value),
      requirement: target.requirement.value,
      location: target.location.value,
      category: target.category.value,
      // contractType: target.contractType.value,
    };
    console.log("new job", newJob);
    axios
      .post(`${process.env.HOST}${process.env.PORT}/job/add`, newJob)
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
        <div className="add_job_page container">
          <form className="job_form" onSubmit={submitHandler}>
            <div className="inputs_field  ">
              <label className="inputs_right_form">
                <p>Job Title</p>
                <input
                  className="input"
                  type="text"
                  name="title"
                  placeholder="Title"
                  required
                />
              </label>

              <label className="inputs_right_form">
                <p>Wage</p>
                <input
                  className="input"
                  type="number"
                  name="wage"
                  placeholder="Wage"
                  required
                />
              </label>
            </div>
            <label className="select">
              <p> Job Category</p>
              <select className="input" name="category" required>
                <option value="developer">developer</option>
                <option value="designer">designer</option>
              </select>
            </label>
            <div className="inputs_field lg-d-flex">
              <label className="inputs_right_form">
                <p>Job Description</p>
                <textarea
                  className="input"
                  rows={5}
                  name="description"
                  placeholder="Job Description"
                  required
                />
              </label>

              <label className="inputs_right_form">
                <p> Requirement</p>
                <textarea
                  className="input"
                  rows={5}
                  name="requirement"
                  placeholder="Requirement"
                  required
                />
              </label>
            </div>

            <label className="select">
              <p> Job Location</p>
              <input
                className="input"
                type="Address Type"
                name="location"
                placeholder="Location"
                required
              />
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
