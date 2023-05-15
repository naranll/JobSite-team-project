// import { UserType } from "@/util/types";
// import { eventNames } from "process";
import { useState, useRef } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
// import { Button } from "primereact/button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function UserEditForm({ user, setVisible }: any): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toast = useRef<any>(null);

  const accept = () => {
    // handleSubmit(event);
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };
  console.log("user", user);
  const [modalVisible, setModalVisible] = useState(false);
  const [skills, setSkills] = useState<string[]>([""]);
  const [image, setImage] = useState<File | null>(null);

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
      console.log(image);
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
    event.preventDefault();
    const formData = new FormData();

    skills.forEach((skill, index) =>
      formData.append(`skills[${index}]`, skill)
    );
    if (image) {
      formData.append("image", image);
    }
  };

  return (
    <div className="w-full">
      <Toast ref={toast} />

      <div className="card flex justify-content-center">
        <form className="max-w-lg mx-auto mt-4 p-6 bg-white rounded-md shadow-md">
          <ConfirmDialog
            visible={modalVisible}
            onHide={() => setModalVisible(false)}
            message="Are you sure you want to proceed?"
            header="Confirmation"
            icon="pi pi-exclamation-triangle"
            accept={accept}
            reject={reject}
          />
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
              placeholder={user.firstName}
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
              placeholder={user.lastName}
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
              onClick={() => setModalVisible(true)}
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
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
