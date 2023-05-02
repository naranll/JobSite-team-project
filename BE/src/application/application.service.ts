import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Application } from './application.schema';
import { ApplicationDto } from './application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel('Application') private applicationModel: Model<Application>,
    @InjectConnection() private connection: Connection,
  ) {}
  async addApp(createAppDto: ApplicationDto): Promise<Application> {
    const createApp = new this.applicationModel(createAppDto);
    return createApp.save();
  }
  async findAll(): Promise<Application[]> {
    return this.applicationModel.find().exec();
  }

  async getAppliedJobsByUserId(
    userId: mongoose.Types.ObjectId,
  ): Promise<Application[]> {
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
}
