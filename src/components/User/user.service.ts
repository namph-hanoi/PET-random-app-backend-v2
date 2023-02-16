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
@Controller("/user")
export class UserService {
  @Post("/create")
  async create() {
    
    // validate
    // find if exist
    // create new user
  }
}