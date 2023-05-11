import {
  Controller,
  Post,
  Get,
  Param,
  Request as Req,
  Response as Res,
} from '@nestjs/common';
import { Request, Response, query } from 'express';
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

<<<<<<< Updated upstream
  @Get('/:id')
  getJob(@Param('id') id: string) {
    return this.jobService.findJob(id);
  }

=======
  @Get('singleJob/:id')
  getJob(@Param('id') id: string) {
    // console.log('job ID', id);
    return this.jobService.findJob(id);
  }

  @Get('filter')
  filetredJob(@Query() query: { category: string; search: string }) {
    // console.log('filter ID', id);
    console.log(query);
    return this.jobService.filetredJob(query);
  }

  @Get('query')
  async search(@Req() Req: Request, @Res() Res: Response) {
    const query = Req.query;
    console.log('query: ', query);
    return Res.status(200);
  }

>>>>>>> Stashed changes
  @Get('posted/:postedBy')
  getPostedJobsByUserId(@Param('postedBy') userId: string): Promise<Job[]> {
    return this.jobService.getPostedJobsByUserId(userId);
  }
}
