import { Controller, Get } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { AppList } from './application.schema';

@Controller(`application`)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}
  @Get('all')
  findAll(): Promise<AppList[]> {
    return this.applicationService.findAll();
  }
}
