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
    @Body({ required: true})
    createUser: CreateUserDto
  ) {
    return this.userService.create(createUser)
    console.log(["🚀 ~ file: user.controller.ts:23 ~ UserController ~ create ~ createUser 233", createUser, this.userService]);
  }
}