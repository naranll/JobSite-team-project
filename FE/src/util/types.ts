export type JobType = {
  map(arg0: (job: JobType) => Promise<any>): unknown;
  postedBy?: undefined | string;
  _id: string;
  title: string;
  description: string;
  payment: number;
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
