import {
  Controller,
  Post,
  Get,
  Param,
  Request as Req,
  Response as Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
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

  @Get('all')
  findAll(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  @Post('add')
  @UseGuards(CheckRoleGuard)
  @CheckRole('CLIENT')
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

  @Get('posted/:postedBy')
  @UseGuards(CheckRoleGuard)
  @CheckRole('CLIENT')
  getPostedJobsByUserId(@Param('postedBy') userId: string): Promise<Job[]> {
    console.log('get jobs posted by user service');
    return this.jobService.getPostedJobsByUserId(userId);
  }
}
