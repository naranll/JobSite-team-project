/* eslint-disable @typescript-eslint/no-explicit-any */
// import { UserType } from "@/util/types";
// import { useRouter } from "next/router";
// import axios from "axios";
import Link from "next/link";
import styles from "../../styles/Login.module.css";
import { useUserContext } from "../../../context/UserContext";

export default function Login(): JSX.Element {
  const { submitHandler } = useUserContext();
  // const router = useRouter();

  // function submitHandler(event: any): void {
  //   event.preventDefault();

  //   const target = event.currentTarget.elements;

  //   const userLogin: UserType = {
  //     email: target.email.value,
  //     password: target.password.value,
  //   };
  //   console.log("user login", userLogin);
  //   axios
  //     .post(`http://localhost:8080/user/login`, userLogin)
  //     .then((res) => {
  //       if (res.data.success) {
  //         router.push("/success");
  //       } else {
  //         console.log("fail");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }

  return (
    <div className={styles.logInFrom}>
    <div className={styles.wrap}>
      <h2 className={styles.title}>Job <span className={styles.titleNow}>Now</span></h2>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.wrapper}>
          

          <div className={styles.wrapFrom}>
            <label >
              <input className={styles.logInInput} type="email" name="email" placeholder="Email"/>
            </label>
            <label >
              <input className={styles.logInInput} type="password" name="password" placeholder="Password"/>
            </label>
          </div>
          <div className={styles.buttons}>
          <Link href={`/user/register`}>
              <input
                placeholder="register"
                disabled
                className={styles.register}
              />
            </Link>
            <button type="submit" className={styles.login}>
              Log in
            </button>
            
          </div>
          <Link href={`/forget password`}>
            <span className={styles.forgetPassword}>
            Forget password
            </span>
          </Link>
        </div>
      </form>
    </div>
    </div>
  );
}
