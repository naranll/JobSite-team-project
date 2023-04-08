import Job from "../model/job";

export const getJobsList = async () => {
  return await Job.find({}).then((res) => {
    return res;
  });
};
