export type JobType = {
  _id: string;
  title: string;
  description: string;
  payment: number;
  createdDate: string;
  updatedDate: Date;
  contractType?: string;
  state: string;
};

export type UserType = {
  _id: string;
  firstName?: string;
  lastName: string;
  password: string;
  gender?: string;
  joinDate?: Date;
  phoneNumber?: number;
  email: string;
  skill?: string;
  role?: string;
};

export type ApplicationType = {
  _id: string;
  jobId: string;
  userId: string;
  createdDate?: Date;
  updatedDate?: Date;
  state?: string;
};

export type CategoryType = {
  _id: string;
  name: string;
};
