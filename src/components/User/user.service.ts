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
import ForgetPasswordDTO from "./dtos/forget-password.dto";
import * as jwt from 'jsonwebtoken';
@Service()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async create(createUserDTO: CreateUserDto) {
    const { email } = createUserDTO;
    const user = await this.userRepository.findOne({ email });
    if (!!user || user !== null) {
      throw Error(`User with email of ${user.email} already existed`);
    }
    const result = await this.userRepository.create(createUserDTO);
    return 'User has been created';
  }

  async sendForgetPasswordToken(forgetPasswordDTO: ForgetPasswordDTO) {
    const { email } = forgetPasswordDTO;
    const user = await this.userRepository.findOne({ email });
    if (!user) throw Error(`The user with the email of ${email} does not exist`);

    const token = jwt.sign({ email }, process.env.JWT_SECRET_FORGET!, { expiresIn: '2h' });
    // Todo: create mail service to send the token
    console.log(["🚀 ~ file: user.service.ts:37 ~ UserService ~ sendForgetPasswordToken ~ token:", token]);
    return 'The token has been sent to your email. Please check the inbox.';
  }
}