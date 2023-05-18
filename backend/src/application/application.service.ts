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
    const createApp = new this.applicationModel(body);
    return createApp.save();
  }
  async findAll(): Promise<Application[]> {
    return this.applicationModel.find().exec();
  }

  async generateStaticId(): Promise<Application[]> {
    const query = await this.applicationModel.find({}).select({ _id: 1 });
    return query;
  }

  async getAppliedJobsByUserId(userId: string): Promise<Application[]> {
    const appliedJobs = await this.applicationModel
      .find({ userId })
      .populate('jobId')
      .select({ jobId: 1, _id: 0, state: 1 });
    return appliedJobs;
  }

  async getApplicantsByJobId(jobId: string): Promise<Application[]> {
    const applicants = await this.applicationModel
      .find({ jobId })
      .populate('userId')
      .select({ userId: 1, _id: 0, state: 1, jobId: 1 });
    return applicants;
  }

  async checkApplied(userId: string, jobId: string): Promise<boolean> {
    const result = await this.applicationModel.find({
      $and: [{ userId: userId }, { jobId: jobId }],
    });
    if (!result.length) {
      return false;
    } else {
      return true;
    }
  }

  async isApplied(userId: string, jobId: string): Promise<boolean> {
    const result = await this.applicationModel.find({
      $and: [{ userId: userId }, { jobId: jobId }],
    });
    if (!result.length) {
      return false;
    } else {
      return true;
    }
  }

  async cancelApply(userId: string, jobId: string): Promise<Application> {
    const result = await this.applicationModel.findOneAndDelete({
      $and: [{ userId: userId }, { jobId: jobId }],
    });
    return result;
  }
}
