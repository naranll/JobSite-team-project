import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection, Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Application } from './application.schema';
import { ApplicationDto } from './application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel('Application') private applicationModel: Model<Application>,
    @InjectConnection() private connection: Connection,
  ) {}
  async addApp(body: Application): Promise<Application> {
    console.log('body', body);

    const createApp = new this.applicationModel(body);
    return createApp.save();
  }
  async findAll(): Promise<Application[]> {
    return this.applicationModel.find().exec();
  }

  async getAppliedJobsByUserId(userId: string): Promise<Application[]> {
    const appliedJobs = await this.applicationModel
      .find({ userId })
      .populate('jobId')
      .select({ jobId: 1, _id: 0, state: 1 });
    // console.log('appliedJobs', appliedJobs);
    return appliedJobs;
  }

  async getApplicantsByJobId(
    jobId: mongoose.Types.ObjectId,
  ): Promise<Application[]> {
    const applicants = await this.applicationModel
      .find({ jobId })
      .populate('userId', '_id')
      .select({ userId: 1, _id: 0, state: 1 });
    return applicants;
  }

  async isApplied(userId: string, jobId: string): Promise<boolean> {
    const result = await this.applicationModel.find({
      $and: [{ userId: userId }, { jobId: jobId }],
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  }
}
