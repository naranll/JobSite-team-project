import "../styles/register.scss";
import { useRouter } from "next/router";
import { UserType } from "@/util/types";
import axios from "axios";

export default function Register(): JSX.Element {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function submitHandler(event: any): void {
    // async?

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
      .post("http://localhost:8008/user/add", data)
      .then((res) => {
        if (res.data.success) {
          router.push("/success");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="wrapper">
      <form onSubmit={(e) => submitHandler(e)}>
        <h1>
          Job<span className="nowTitle">Site</span>
        </h1>
        <label>
          <p className="titles">First name</p>
          <input
            className="inputs"
            id="firstName"
            name="firstName"
            type="text"
          />
        </label>
        <label>
          <p className="titles">Last name</p>
          <input className="inputs" name="lastName" type="text" />
        </label>
        <label>
          <p className="titles">Email</p>
          <input className="inputs" name="email" type="text" />
        </label>

        <label>
          <p className="titles">Password</p>
          <input className="inputs" name="password" type="password" />
        </label>

        <div className="submit">
          <label>
            <p className="titles">Phone number</p>
            <input type="number" name="phoneNumber" className="inputs" />
          </label>
        </div>
        <label className="gender">
          <p>Gender</p>
          <select className="option" name="gender">
            <option defaultValue={"select"} disabled>
              select
            </option>
            <option>male</option>
            <option>female</option>
            <option>other</option>
          </select>
        </label>
        <button type="submit" className="submitBtn">
          Submit
        </button>
      </form>
    </div>
  );
}
