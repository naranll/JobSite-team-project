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
    console.log('login req');
    const payload = await this.userService.logIn(
      UserDto.email,
      UserDto.password,
    );
    console.log('got user', payload);
    const token = await this.jwtService.signAsync(payload);
    console.log('token', token);
  }

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }
}
