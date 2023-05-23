import { ObjectId } from 'mongoose';

export class ApplicationDto {
  _id: ObjectId;
  jobId: string;
  userId: string;
  state: string;
  createdDate: Date;
  updatedDate: Date;
}
