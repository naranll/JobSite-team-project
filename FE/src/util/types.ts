export type JobType = {
  postedBy?: undefined | string;
  _id: string;
  title: string;
  description: string;
  wage: number;
  createdDate?: Date;
  contractType?: string;
};

export type UserType = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  password: string;
  email: string;
  gender?: string;
  phoneNumber?: number;
  image?: string;
  skills?: [string];
};

export type AppliedJobsType = {
  state: string;
};
