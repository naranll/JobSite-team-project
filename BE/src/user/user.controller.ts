import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserDto} from "./user.dto";
import {User} from "./user.schema";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("all")
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post("add")
  createUser(@Body() body: UserDto): Promise<User> {
    console.log("request body", body);
    return this.userService.addUser(body);
  }

  @Post("login")
  signIn(@Body() UserDto: UserDto) {
    return this.userService.signIn(UserDto.email, UserDto.password);
  }

  @Get("/:id")
  getUser(@Param("id") id: string) {
    return this.userService.findUser(id);
  }
}
