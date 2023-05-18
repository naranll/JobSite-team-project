/* eslint-disable @typescript-eslint/no-explicit-any */
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import {UserType} from "@/util/types";
// import axios from "axios";
// import {useRouter} from "next/router";
import {ReactNode, createContext, useContext, useEffect, useState} from "react";
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

export const UserContextProvider = ({children}: UserProviderType) => {
  const [currentUser, setCurrentUser] = useState<UserType | null>();
  // const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setCurrentUser(jwtDecode(token));
      // router.push("/");
    }
  }, []);

  function handleLogout() {
    setCurrentUser(null);
    Cookies.remove("token");
  }

  return (
    <UserContext.Provider value={{currentUser, setCurrentUser, handleLogout}}>
      {children}
    </UserContext.Provider>
  );
};
