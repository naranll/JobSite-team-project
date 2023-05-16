/* eslint-disable @typescript-eslint/no-explicit-any */
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { UserType } from "@/util/types";
// import axios from "axios";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
export interface IUserContext {
  currentUser: UserType | null | undefined;

  setCurrentUser: React.Dispatch<
    React.SetStateAction<UserType | null | undefined>
  >;
  handleLogout: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // submitHandler: (e: any) => void;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

interface UserProviderType {
  children: ReactNode;
}
// interface LoginType {
//   email: string;
//   password: string;
// }

// interface MyJwtPayload extends JwtPayload {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   _doc: any;
// }

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: UserProviderType) => {
  const [currentUser, setCurrentUser] = useState<UserType | null>();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setCurrentUser(jwtDecode(token));
      router.push("/");
    }
  }, []);

  function handleLogout() {
    setCurrentUser(null);
    Cookies.remove("token");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // function submitHandler(event: any): void {
  //   event.preventDefault();

  //   const target = event.currentTarget.elements;
  //   const userLogin: LoginType = {
  //     email: target.email.value,
  //     password: target.password.value,
  //   };
  //   axios
  //     .post(`${process.env.NEXT_PUBLIC_JOBSITE_HOST}/user/login`, userLogin)
  //     .then((res) => {
  //       if (res.status === 201) {
  //         const decoded: MyJwtPayload = jwtDecode(res.data.token);
  //         const user = decoded["_doc"];
  //         Cookies.set("token", res.data.token);
  //       } else {
  //         console.log("login fail");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
