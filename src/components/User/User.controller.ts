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
  
@Service()
@Controller("/auth")
export class AuthController {
  @Post("/login")
  async login() {
    console.log('🤟 Logged in')
  }
}