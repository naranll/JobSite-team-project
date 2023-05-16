import { useUserContext } from "@/context/UserContext";
import { UserType } from "@/util/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import UserEditForm from "./UserEditForm";

export default function ProfileInfo(): JSX.Element {
  const { currentUser } = useUserContext();
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getUser = async (id: string | undefined) => {
      console.log("user ID", id);
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/user/${id}`
      );
      setUser(result.data);
      console.log("user", user);
    };
    if (currentUser) {
      getUser(currentUser._id);
    }
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
              <div className="">
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
          </div>
          <div className="border-2 p-3 m-3 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">General Information:</h2>
            <div>
              <h3 className="text-lg font-semibold">About me</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                sunt excepturi modi maiores nulla cum, ducimus sint at
                explicabo, ut dicta aperiam qui dolorem iure architecto
                inventore laudantium totam placeat tempore vel earum, possimus
                magnam harum. Repellendus cum minima natus consectetur assumenda
                quis ipsum dignissimos, accusamus quibusdam vel maiores
                suscipit?
              </p>
            </div>
          </div>
          <Dialog
            header="Settings"
            visible={visible}
            style={{ width: "60vw", height: "80vh" }}
            onHide={() => setVisible(false)}
          >
            <UserEditForm user={user} setVisible={setVisible} />
          </Dialog>
        </>
      )}
    </div>
  );
}
