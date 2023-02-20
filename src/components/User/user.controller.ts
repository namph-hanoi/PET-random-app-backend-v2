import { Service } from "typedi";
import {
    Authorized,
    Body,
    Controller,
    CurrentUser,
    Get,
    HttpCode,
    Param,
    Post,
    QueryParam,
    Req,
    Res,
    UseBefore,
  } from "routing-controllers";
import CreateUserDto from './dtos/create-user.dto';
import { ValidateReqBody } from "@/decorators/validateReqBody";
import { UserService } from "./user.service";
import ForgetPasswordDTO from "./dtos/forget-password.dto";
import ResetPasswordDTO from "./dtos/reset-password.dto";

@Service()
@Controller("/user")
export class UserController {
  constructor(private userService: UserService) {}

  // Todo: turn code into variables
  @HttpCode(201)
  @Post("/register")
  async create(
    @Body({ required: true})
    createUser: CreateUserDto
  ) {
    return await this.userService.create(createUser);
  }

  @HttpCode(200)
  @Post('/forget-password')
  async forget(
    @Body()
    forgetPasswordDTO: ForgetPasswordDTO
  ) {
    return this.userService.sendForgetPasswordToken(forgetPasswordDTO);
  }

  @HttpCode(200)
  @Post('/reset-password')
  async resetPassword(
    @QueryParam('token')
    token: string,
    @Body()
    resetPasswordDTO: ResetPasswordDTO
  ) {
    return this.userService.resetPassword(token, resetPasswordDTO);
  }
}