import {
  Controller,
  Get,
  Param,
  Post,
  Request as Req,
  Response as Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('all')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('user_id')
  getStaticId(): Promise<User[]> {
    console.log('generating static paths for user');
    return this.userService.generateStaticIdforUser();
  }

  @Post('add')
  async createUser(@Req() request: Request, @Res() response: Response) {
    try {
      await this.userService.createUser(request.body);
      response.status(200).json({ success: true });
    } catch (error) {
      response.status(500).json({ success: false });
    }
  }

  @Post('login')
  async logIn(@Req() request: Request, @Res() response: Response) {
    const { email, password } = request.body;
    const user: User = await this.userService.logIn(email, password);
    const payload = { ...user };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    });

    response.json({ token: token });
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }
}
