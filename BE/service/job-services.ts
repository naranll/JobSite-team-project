import Job from "../model/Job";

export const getJobsList = async () => {
  return await Job.find({}).then((res) => {
    return res;
  });
};
