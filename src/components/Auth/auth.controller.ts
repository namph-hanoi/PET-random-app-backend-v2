import { Service } from "typedi";
import {
    Body,
    Controller,
    CookieParams,
    HttpCode,
    Post,
    Res,
  } from "routing-controllers";
import { AuthService } from './auth.service';
import LoginDTO from "./dtos/login.dto";
import { Response } from "express";
import { ObjectType } from "typescript";
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

  @HttpCode(200)
  @Post("/refresh")
  async refresh(
    @CookieParams()
    cookieObject: {[K: string]: any}
  ) {
    const refreshToken = cookieObject[process.env.REFRESH_TOKEN_COOKIE_KEY! as keyof ObjectType];
    if (!refreshToken) throw new Error(`There is no refreshToken found`);
    return await this.authService.refreshToken(refreshToken);  
  }
}
