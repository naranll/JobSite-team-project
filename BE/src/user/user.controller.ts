import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { User } from './user.schema';
import { JwtService } from '@nestjs/jwt';

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
  createUser(@Body() body: User): Promise<User> {
    console.log('request body', body);
    return this.userService.createUser(body);
  }

  @Post('login')
  async logIn(@Body() UserDto: UserDto) {
    const user = await this.userService.logIn(UserDto.email, UserDto.password);
    const payload = { ...user };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return token;
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }
}
