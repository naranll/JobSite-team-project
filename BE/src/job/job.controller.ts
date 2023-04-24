import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { Jobdto } from './job.dto';
import { Job } from './job.schema';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('all')
  findAll(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  @Post('add')
  createJob(@Body() body: Jobdto): Promise<Job> {
    console.log('request body ', body);
    return this.jobService.addJob(body);
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
}
