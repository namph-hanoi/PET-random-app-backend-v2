import { Service } from "typedi";
import {
    Authorized,
    Body,
    Controller,
    CurrentUser,
    Get,
    Param,
    Post,
    Req,
    Res,
    UseBefore,
  } from "routing-controllers";
import CreateUserDto from './dtos/create-user.dto';
import { ValidateReqBody } from "@/decorators/validateReqBody";
import { UserService } from "./user.service";

@Service()
@Controller("/user")
export class UserController {
  constructor(private userService: UserService) {}
  @Post("/register")
  async create(
    @ValidateReqBody(CreateUserDto)
    @Body()
    createUser: CreateUserDto
  ) {

    console.log(["🚀 ~ file: user.controller.ts:23 ~ UserController ~ create ~ createUser 233", createUser, this.userService]);
    // validate
    // find if exist
    // create new user
  }
}