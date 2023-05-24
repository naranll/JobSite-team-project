// import { UserType } from "@/util/types";
// import { eventNames } from "process";
import { useState, useRef, ChangeEvent } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
// import { UserType } from "@/util/types";
import axios from "axios";
import { useUserContext } from "@/context/UserContext";
// import { useRouter } from "next/router";

interface RequestData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserEditForm({ user, setVisible }: any): JSX.Element {
  const { currentUser } = useUserContext();
  // const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toast = useRef<any>(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // phoneNumber: null,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [skills, setSkills] = useState<string[]>(user.skills);
  const [image, setImage] = useState<File | null>(null);

  const showInfo = () => {
    toast.current.show({
      severity: "success",
      summary: "success",
      detail: "user information successfully saved",
      life: 3000,
    });
  };

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };
  const handleSkillChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newSkills = [...skills];
    newSkills[index] = event.target.value;
    setSkills(newSkills);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: any): void => {
    console.log("submit");
    console.log("skills", skills);
    console.log("userData:", userData);
    event.preventDefault();

    const requestData: RequestData = {};
    if (userData.firstName.trim() !== "") {
      requestData["firstName"] = userData.firstName.trim();
    }
    if (userData.lastName.trim() !== "") {
      requestData["lastName"] = userData.lastName.trim();
    }
    if (userData.email.trim() !== "") {
      requestData["email"] = userData.email.trim();
    }
    // if (userData.phoneNumber) {
    //   requestData["phoneNumber"] = userData.phoneNumber;
    // }

    console.log("request data:", requestData);

    const formData = new FormData();

    if (skills.length != 0) {
      console.log("skill length", skills.length);
      const addedSkills = skills;
      formData.append("skills", JSON.stringify(addedSkills));
    }

    if (image) {
      formData.append("image", image);
    }
    formData.append("data", JSON.stringify(requestData));
    // formData.append("skills", JSON.stringify(skills));

    axios({
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_JOBSITE_HOST}/user/${currentUser?._id}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      if (res.data.message) {
        setVisible(false), showInfo();
      }
    });
  };

  return (
    <div className="w-full">
      <Toast ref={toast} />

      <div className="card flex justify-content-center">
        <form
          id="myForm"
          method="POST"
          encType="multipart/form-data"
          className="max-w-lg mx-auto mt-4 p-6 bg-white rounded-md shadow-md"
        >
          <Dialog
            className="text-center"
            header="Confirmation"
            visible={modalVisible}
            onHide={() => setModalVisible(false)}
          >
            <div className="p-3">Save changes to user information ? </div>
            <div className="flex justify-center gap-3">
              <Button
                onClick={(event) => {
                  handleSubmit(event);
                  setModalVisible(false);
                }}
              >
                yes
              </Button>
              <Button onClick={() => setModalVisible(false)}>no</Button>
            </div>
          </Dialog>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="File"
              name="image"
              placeholder="image"
              onChange={handleImageChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="firstName"
            >
              First name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              name="firstName"
              placeholder={user.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="lastName"
            >
              Last name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              name="lastName"
              placeholder={user.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone number:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNumber"
              type="number"
              name="phoneNumber"
              min={0}
              placeholder={user.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Skills:
            </label>
            {skills.map((skill: string, index: number) => (
              <div key={index}>
                <label htmlFor={`skill-${index}`}>
                  <input
                    className="appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    id={`skill-${index}`}
                    value={skill}
                    onChange={(event) => handleSkillChange(event, index)}
                  />
                  <button
                    disabled={skills.length === 1}
                    className="bg-red-400 w-1/5 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                  >
                    -
                  </button>
                </label>
              </div>
            ))}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleAddSkill}
            >
              Add Skill
            </button>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setModalVisible(true);
                confirm;
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Save
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => setVisible(false)}
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
