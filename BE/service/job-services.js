import Job from "../model/job.js";

export const getJobsList = async () => {
  return await Job.find({}).then((res) => {
    return res;
  });
};
