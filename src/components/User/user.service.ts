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
import UserRepository from './user.repository';
import CreateUserDto from "./dtos/create-user.dto";
@Service()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  @Post("/create")
  async create(createUserDTO: CreateUserDto) {
    const { email } = createUserDTO;
    const user = await this.userRepository.findOne({ email });
    if (!!user || user !== null) {
      throw Error(`User with email of ${user.email} already existed`);
    }
    const result = await this.userRepository.create(createUserDTO);
    return result;
  }
}