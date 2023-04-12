import { userType } from "../util/types";
import User from "../model/User";

export const getUsers = async () => {
  return await User.find({}).then((res) => {
    return res;
  });
};

export const addUser = async (data: userType) => {
  const newUser = new User(data);
  console.log("newUser;", newUser);
  const result = await newUser.save();
  console.log("result:", result);
  return result;
};
