import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Application } from './application.schema';
import { ApplicationDto } from './application.dto';
// import { Job } from "src/job/job.schema";

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

  async getAppliedJobsByUserId(userId: string): Promise<void> {
    const applications = await this.applicationModel
      .find({ userId })
      .populate('jobId');
    // const jobsId = applications.map((application) => application.jobId);
    // console.log("applied jobsId", jobsId);
    console.log("user's applications", applications);
  }
}

// .populate({path: "Job", options: {strictPopulate: false}})
