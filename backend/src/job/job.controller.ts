import {
  Controller,
  Post,
  Get,
  Param,
  Request as Req,
  Response as Res,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Request, Response, query } from 'express';
// import { Query } from 'mongoose';
// import { Query } from '@nestjs/common';
import { Job } from './job.schema';
import { JobService } from './job.service';
import { CheckRoleGuard } from 'src/role/role.guard';
import { JwtService } from '@nestjs/jwt';
import { CheckRole } from 'src/role/role.decorator';

@Controller('job')
export class JobController {
  constructor(
    private readonly jobService: JobService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('test')
  testFunctiona(@Req() req: Request) {
    console.log(req['user']);
  }

  @Get('all')
  findAll(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  @Post('add')
  // @UseGuards(CheckRoleGuard)
  // @CheckRole('CLIENT')
  async createJob(@Req() req: Request, @Res() res: Response) {
    try {
      console.log('add job req body ', req.body);
      const result = await this.jobService.addJob(req.body);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.log({ error: error });
    }
  }

  @Get('job_id')
  getStaticId(): Promise<Job[]> {
    console.log('generating static paths');
    return this.jobService.generateStaticId();
  }

  @Get('singleJob/:id')
  getJob(@Param('id') id: string) {
    console.log('job ID', id);
    return this.jobService.findJob(id);
  }

  //////search and filter
  @Get('filter')
  filetredJob(@Query() query: { category: string; search: string }) {
    return this.jobService.filetredJob(query);
  }

  @Get('query')
  async search(@Req() Req: Request, @Res() Res: Response) {
    const query = Req.query;
    console.log('query : =>  ', query);
    return Res.status(200);
  }

  ////page
  @Get('pageNumbers')
  countNum(): Promise<number> {
    return this.jobService.countNum();
  }

  @Get('page/:id')
  findPage(@Param('id') pageNumbers: number): Promise<Job> {
    return this.jobService.findPage(pageNumbers);
  }

  @Get('posted/:postedBy')
  @UseGuards(CheckRoleGuard)
  @CheckRole('CLIENT')
  getPostedJobsByUserId(@Param('postedBy') userId: string): Promise<Job[]> {
    console.log('get jobs posted by user service');
    return this.jobService.getPostedJobsByUserId(userId);
  }
}
