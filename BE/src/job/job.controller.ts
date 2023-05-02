import {
  Controller,
  Post,
  Get,
  Param,
  Request as Req,
  Response as Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Job } from './job.schema';
import { JobService } from './job.service';
import mongoose from 'mongoose';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('all')
  findAll(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  @Post('add')
  async createJob(@Req() Req: Request, @Res() Res: Response) {
    try {
      console.log('request body ', Req.body);
      const result = await this.jobService.addJob(Req.body);
      return Res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.log({ error: error });
    }
  }

  @Get('job_id')
  getStaticId(): Promise<Job[]> {
    console.log('generating static paths');
    return this.jobService.generateStaticId();
  }

  @Get('/:id')
  getJob(@Param('id') id: string) {
    return this.jobService.findJob(id);
  }

  @Get('posted/:id')
  getPostedJobsByUserId(
    @Param('id') userId: mongoose.Types.ObjectId,
  ): Promise<Job[]> {
    return this.jobService.getPostedJobsByUserId(userId);
  }
}
