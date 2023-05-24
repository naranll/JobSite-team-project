import {useUserContext} from "@/context/UserContext";
import {UserType} from "@/util/types";
import axios from "axios";
import {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import UserEditForm from "./UserEditForm";
import DocumentForm from "./DocumentForm";

export default function ProfileInfo(): JSX.Element {
  const {currentUser} = useUserContext();
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [visible, setVisible] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(false)


  useEffect(() => {
    const getUser = async (id: string | undefined) => {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/user/${id}`
      );
      setUser(result.data);
    };
    if (currentUser) {
      getUser(currentUser._id);
      
    }
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {user && (
        <>
          <div className="relative border-2 p-3 m-3 rounded-lg shadow-md">
            <div className="absolute right-3 z-10">
              <Button
                aria-label="edit"
                icon="pi pi-file-edit"
                severity="info"
                onClick={() => setVisible(true)}
              />
            </div>
            <div className="relative flex p-4 gap-4">
              <div className="w-24 h-24">
                <picture>
                  <img className="rounded-lg" src={user.image} alt="user" />
                </picture>
              </div>
              <div>
                <div className="font-semibold text-lg">
                  {user.firstName} {user.lastName}
                </div>
                <div>field: </div>
                <div>location: </div>
              </div>
            </div>
            <div>
              <div>email: {user.email}</div>
              <div>address: UB</div>
              <div>Phone number: {user.phoneNumber} </div>
            </div>
          </div>
          <div className="border-2 p-3 m-3 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Skills:</h2>
            <ul className="flex gap-3">
              {user.skills?.map((skill, index) => (
                <li
                  className="font-bold bg-blue-400 rounded-lg p-3 hover:bg-blue-500"
                  key={index}
                >
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-2 p-3 m-3 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">CV:</h2>
            <div className=" m-5 flex justify-center">
              {user.cv ? <div className="flex justify-between gap-5 items-center"> <a className="border-2 p-3 rounded-lg shadow-md hover:bg-slate-300" href={user.cv}>click to download cv</a> <p onClick={() => setDocumentVisible(true)} className="border-2 p-3 rounded-lg hover:bg-slate-300 cursor-pointer">or upload CV</p> </div> : <DocumentForm {...user} /> }
              <Dialog header="Upload Document" visible={documentVisible} style={{width: "40vw", height: "40vh"}} onHide={() => setDocumentVisible(false)} > <DocumentForm user={user} setDocumentVisible={setDocumentVisible} /> </Dialog>
            </div>
          </div>
          <Dialog
            header="Settings"
            visible={visible}
            style={{width: "60vw", height: "80vh"}}
            onHide={() => setVisible(false)}
          >
            <UserEditForm user={user} setVisible={setVisible} />
          </Dialog>
        </>
      )}
    </div>
  );
}
