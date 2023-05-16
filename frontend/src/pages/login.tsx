/* eslint-disable @typescript-eslint/no-explicit-any */
import {useRouter} from "next/router";
import axios from "axios";
import Link from "next/link";
import {useUserContext} from "../context/UserContext";
import {FcGoogle} from "react-icons/fc";
import jwtDecode, {JwtPayload} from "jwt-decode";
import Cookies from "js-cookie";

interface LoginType {
  email: string;
  password: string;
}

interface MyJwtPayload extends JwtPayload {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _doc: any;
}

export default function Login(): JSX.Element {
  const {setCurrentUser} = useUserContext();
  const router = useRouter();

  function googleLogin() {
    axios
      .get("http://localhost:8008/google-login")
      .then((res) => router.push(res.data));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function submitHandler(event: any): void {
    event.preventDefault();

    const target = event.currentTarget.elements;
    const userLogin: LoginType = {
      email: target.email.value,
      password: target.password.value,
    };
    axios
      .post(`http://localhost:8008/user/login`, userLogin)
      .then((res) => {
        if (res.status === 201) {
          const decoded: MyJwtPayload = jwtDecode(res.data.token);
          const user = decoded["_doc"];
          setCurrentUser(user);
          Cookies.set("token", res.data.token);
          router.push("/");
        } else {
          console.log("login fail");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <div className="sm:min-w-[360px] lg:min-w-[560px] rounded-lg border-2  p-8">
        <div
          className="flex w-full border-2 justify-center items-center p-2 gap-2 rounded-lg cursor-pointer "
          onClick={googleLogin}
        >
          <FcGoogle size={"2em"} />
          Continue With Google
        </div>
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"> </div>
          <span className="text-gray-500 text-xs">
            or with Email and Password
          </span>
          <div className="flex-grow border-t border-gray-400"> </div>
        </div>

        <form onSubmit={submitHandler} className="">
          <div className="">
            <div className="">
              <label htmlFor="email">
                <p className="">Email</p>
                <input
                  id="email"
                  placeholder="Email"
                  className="w-full border-2 rounded-lg  p-2"
                  name="email"
                  type="email"
                  required
                />
              </label>
              <label>
                <p className="">Password</p>
                <input
                  placeholder="password"
                  className="w-full border-2 rounded-lg  p-2"
                  name="password"
                  type="password"
                />
              </label>
            </div>
            <Link href={`/`}>
              <div className="text-right">Forgot password?</div>
            </Link>
            <div className="">
              <button
                type="submit"
                className="w-full text-center p-2 rounded-lg bg-[#1A75E8] text-white hover:bg-[#5A99EA] mt-8"
              >
                Login
              </button>
              <div className="flex justify-center mt-8 gap-3">
                <span>not a member?</span>
                <Link href={`/register`} className="login-register-link">
                  <div className="font-semibold">Register</div>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
