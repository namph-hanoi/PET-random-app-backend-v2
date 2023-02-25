import { Service } from "typedi";
import { UserService } from '../User/user.service';
import * as jwt from 'jsonwebtoken';
import LoginDTO from "./dtos/login.dto";
import { compareSync } from "bcryptjs";
import { Res } from "routing-controllers";
import { Response } from "express";

@Service()
export class AuthService {
  constructor(
    private userService: UserService,
  ) {}

  async login(loginDTO: LoginDTO, response: Response) {
    const { email, password } = loginDTO;
  
    const user = await this.userService.findOne(email);

    // Todo: Systematize the Errors into class base
    if (!user || user === null) throw Error(`There is no user with the email of ${email}`);

    const isAuthentic = compareSync(
      password,
      user.password
    );

    if (!isAuthentic) throw new Error(`Fail login`)
    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET_AUTH!, { expiresIn: '15s'});
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '5m'});
    
    response.cookie(process.env.REFRESH_TOKEN_COOKIE_KEY!, refreshToken, { httpOnly: true, 
      sameSite: 'none', secure: true, 
      maxAge: 24 * 60 * 60 * 1000 });
    return response.json({ accessToken });
  }  
}