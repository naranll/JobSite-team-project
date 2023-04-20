import { Body, Controller, Post, Get } from '@nestjs/common';
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
<<<<<<< HEAD
  @Post('add')
=======
  @Post('job/add')
>>>>>>> 222329b (job-crud)
  createJob(@Body() body: Jobdto): Promise<Job> {
    console.log('request body ', body);
    return this.jobService.addJob(body);
  }
}
