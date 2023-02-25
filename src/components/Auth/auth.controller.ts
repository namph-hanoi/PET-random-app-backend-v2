import { Service } from "typedi";
import {
    Body,
    Controller,
    HttpCode,
    Post,
    Res,
  } from "routing-controllers";
import { AuthService } from './auth.service';
import LoginDTO from "./dtos/login.dto";
import { Response } from "express";
@Service()
@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService){}

  @HttpCode(200)
  @Post("/login")
  async login(
    @Body()
    loginDTO: LoginDTO,
    @Res()
    response: Response
  ) {
    return await this.authService.login(loginDTO, response);  
  }
}
