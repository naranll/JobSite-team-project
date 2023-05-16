import { useRouter } from "next/router";
import { UserType } from "@/util/types";
import axios from "axios";
import { useState } from "react";

export default function Register(): JSX.Element {
  const router = useRouter();
  const [showErrorMsg, setShowErrorMsg] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function submitHandler(event: any): void {
    event.preventDefault();

    const data: UserType = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      password: event.target.password.value,
      email: event.target.email.value,
      gender: event.target.gender.value,
      phoneNumber: event.target.phoneNumber.value,
    };

    console.log("new User", data);

    axios
      .post(`${process.env.NEXT_PUBLIC_JOBSITE_HOST}/user/add`, data)
      .then((res) => {
        if (res.data.success) {
          console.log("successfully added user");
          router.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        setShowErrorMsg(true);
      });
  }

  return (
    <div className="register-page w-screen min-h-screen">
      <form
        onSubmit={(e) => submitHandler(e)}
        className="register-form flex flex-col w-[300px] sm:w-[360px] lg:w-[496px] mx-auto shadow-xl"
      >
        <h1 className="register-form-title mx-auto">Create New Account</h1>
        <label className="register-field mt-[24px]">
          <p className="">First name</p>
          <input id="firstName" name="firstName" type="text" className="" />
        </label>

        <label className="register-field">
          <p className="">Last name</p>
          <input name="lastName" type="text" className="" />
        </label>

        <label className="register-field flex items-center gap-2">
          <p>Gender</p>
          <select name="gender" className="register-field-gender">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </label>

        <label className="register-field">
          <p className="">Email</p>
          <input name="email" type="text" className="" />
        </label>

        <label className="register-field">
          <p className="">Phone number</p>
          <input type="number" name="phoneNumber" />
        </label>

        <label className="register-field">
          <p className="">Password</p>
          <input name="password" type="password" />
        </label>

        <button type="submit" className="btn-style">
          Submit
        </button>
      </form>
      {showErrorMsg && <p>User with the email exists</p>}
    </div>
  );
}
