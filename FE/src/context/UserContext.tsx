import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { UserType } from "@/util/types";
import axios from "axios";
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
  submitHandler: (e: any) => void;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

interface UserProviderType {
  children: ReactNode;
}

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: UserProviderType) => {
  const [currentUser, setCurrentUser] = useState<UserType | null>();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setCurrentUser(jwtDecode(token));
    }
  }, []);

  function handleLogout() {
    setCurrentUser(null);
    Cookies.remove("token");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function submitHandler(event: any): void {
    event.preventDefault();

    const target = event.currentTarget.elements;

    const userLogin: UserType = {
      email: target.email.value,
      password: target.password.value,
    };
    console.log("user login", userLogin);
    axios
      .post(`http://localhost:8008/user/login`, userLogin)
      .then((res) => {
        console.log("response", res);
        if (res.status === 201) {
          setCurrentUser(res.data);
          router.push("/");
        } else {
          console.log("fail");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, submitHandler, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};
