/* eslint-disable @typescript-eslint/no-explicit-any */
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import {UserType} from "@/util/types";
// import axios from "axios";
// import {useRouter} from "next/router";
import {ReactNode, createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
export interface IUserContext {
  currentUser: UserType | undefined;

  setCurrentUser: React.Dispatch<React.SetStateAction<UserType | undefined>>;
  handleLogout: () => void;
  token: string | undefined;
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

export const UserContextProvider = ({children}: UserProviderType) => {
  const [currentUser, setCurrentUser] = useState<UserType | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setCurrentUser(jwtDecode(token));
    }
  }, [token]);
  useEffect(() => {
    const cookie = Cookies.get("token");
    if (cookie) {
      setToken(Cookies.get("token"));
    }
  }, [router.pathname]);

  function handleLogout() {
    setCurrentUser(undefined);
    Cookies.remove("token");
  }

  return (
    <UserContext.Provider
      value={{currentUser, setCurrentUser, handleLogout, token}}
    >
      {children}
    </UserContext.Provider>
  );
};
