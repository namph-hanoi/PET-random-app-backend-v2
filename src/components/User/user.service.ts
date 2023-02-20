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
import ResetPasswordDTO from "./dtos/reset-password.dto";
@Service()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDTO: CreateUserDto): Promise<string> {
    const { email } = createUserDTO;
    const user = await this.userRepository.findOne({ email });
    if (!!user || user !== null) {
      throw Error(`User with email of ${user.email} already existed`);
    }
    // Todo: check if the global error catch the correct error to remove try catch block here
    try {
      await this.userRepository.create(createUserDTO);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
    return 'User has been created';
  }

  async sendForgetPasswordToken(forgetPasswordDTO: ForgetPasswordDTO): Promise<string> {
    const { email } = forgetPasswordDTO;
    const user = await this.userRepository.findOne({ email });
    if (!user) throw Error(`The user with the email of ${email} does not exist`);

    const token = jwt.sign({ email }, process.env.JWT_SECRET_FORGET!, { expiresIn: '2h' });
    // Todo: create mail service to send the token
    console.log(["🚀 ~ file: user.service.ts:37 ~ UserService ~ sendForgetPasswordToken ~ token:", token]);
    return 'The token has been sent to your email. Please check the inbox.';
  }

  async resetPassword(token: string, resetPasswordDTO: ResetPasswordDTO): Promise<string> {
    const { email } = jwt.verify(token, process.env.JWT_SECRET_FORGET!) as jwt.JwtPayload;
    const user = await this.userRepository.findOne({ email });
    user.password = resetPasswordDTO.newPassword;
    try {
      user.save();
      return 'New password has been save'
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }
}