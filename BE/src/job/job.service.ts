import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Job } from './job.schema';
import { Jobdto } from './job.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectModel('jobs') private jobModel: Model<Job>,
    @InjectConnection() private connection: Connection,
  ) {}

  async addJob(createJobDto: Jobdto): Promise<Job> {
    const createJob = new this.jobModel(createJobDto);
    return createJob.save();
  }

  async findAll(): Promise<Job[]> {
    return this.jobModel.find().exec();
  }
}
