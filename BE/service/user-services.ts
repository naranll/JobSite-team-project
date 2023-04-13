import { UserType } from "../util/types";
import User from "../model/User";

export const getUsers = async () => {
  return await User.find({}).then((res) => {
    return res;
  });
};

export const addUser = async (data: UserType) => {
  const newUser = new User(data);
  console.log("newUser;", newUser);
  const result = await newUser.save();
  console.log("result:", result);
  return result;
};

export const checkUser = async (data: UserType) => {
  console.log("data", data);

  const { email } = data;

  const result: UserType | null = await User.findOne(
    { email },
    { password: 1 }
  );

  if (result && result.password === data.password) {
    return true;
  } else {
    return false;
  }
};
