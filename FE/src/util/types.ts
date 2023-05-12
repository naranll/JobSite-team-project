export type JobType = {
  postedBy?: undefined | string;
  _id?: string;
  title: string;
  description: string;
  wage: number;
  createdDate?: string;
  contractType?: string;
  category?: string;
  requirement: string;
  location: string;
};

export type UserType = {
  _id?: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  gender?: string;
  phoneNumber?: number;
  image?: string;
  skills?: [string];
};

export type ApplicationType = {
  _id?: string;
  jobId: string;
  userId: string;
  state: string;
  createdDate: Date;
  updatedDate?: Date;
};

export type AppliedJobsType = {
  state: string;
};
