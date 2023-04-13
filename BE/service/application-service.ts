import Application from "../model/Application";
import { ApplicationType } from "../util/types";

export const addApplication = async (data: ApplicationType) => {
  console.log("application data", data);

  const newApplication = new Application(data);
  const result = await newApplication.save();
  return result;
};
