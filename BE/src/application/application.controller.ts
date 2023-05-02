import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { Application } from './application.schema';
import { ApplicationDto } from './application.dto';
import mongoose from 'mongoose';
// import { Job } from 'src/job/job.schema';

@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}
  @Get('all')
  findAll(): Promise<Application[]> {
    return this.applicationService.findAll();
  }

  @Post('add')
  addAppList(@Body() body: ApplicationDto): Promise<Application> {
    console.log('req body:', body);
    return this.applicationService.addApp(body);
  }

  @Get('/:id')
  getAppliadJobsByUserId(
    @Param('id') userId: mongoose.Types.ObjectId,
  ): Promise<Application[]> {
    return this.applicationService.getAppliedJobsByUserId(userId);
  }

  @Get('/applicants/:jobId')
  getApplicantsByJobId(
    @Param('jobId') jobId: mongoose.Types.ObjectId,
  ): Promise<Application[]> {
    return this.applicationService.getApplicantsByJobId(jobId);
  }
}
