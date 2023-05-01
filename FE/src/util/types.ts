export type JobType = {
  postedBy: string | undefined;
  _id?: string;
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
};
