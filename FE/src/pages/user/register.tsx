import styles from "../../styles/register.module.css";
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
      .post("http://localhost:8080/user/register", data)
      .then((res) => {
        if (res.data.success) {
          router.push("/success");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={(e) => submitHandler(e)}>
        <label>
          <p>First name:</p>
          <input id="firstName" name="firstName" type="text" />
        </label>
        <label>
          <p>Last name:</p>
          <input name="lastName" type="text" />
        </label>
        <label>
          <p>Email:</p>
          <input name="email" type="text" />
        </label>
        <label>
          <p>Password:</p>
          <input name="password" type="password" />
        </label>
        <label>
          <p>gender:</p>
          <select name="gender">
            <option defaultValue={"select"} disabled>
              select
            </option>
            <option>male</option>
            <option>female</option>
            <option>other</option>
          </select>
        </label>
        <label>
          <p>Phone number:</p>
          <input type="number" name="phoneNumber" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
