import {ObjectId} from "mongoose";

export type JobType = {
  _id: string;
  title: string;
  description: string;
  payment: number;
  createdDate?: Date;
  updatedDate?: Date;
  contractType?: string;
};

export type UserType = {
  _id: string;
  firstName?: string;
  lastName?: string;
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
  jobId: ObjectId;
  userId: ObjectId;
  createdAt: Date;
  updatedAt?: Date;
  state?: string;
};
