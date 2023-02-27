import { Service } from "typedi";
import { UserService } from '../User/user.service';
import * as jwt from 'jsonwebtoken';
import LoginDTO from "./dtos/login.dto";
import { compareSync } from "bcryptjs";
import { Response } from "express";
import RefreshTokenDTO from "./dtos/refreshToken.dto";
import { validate } from "class-validator";

@Service()
export class AuthService {
  constructor(
    private userService: UserService,
  ) {}

  private generateToken(email: string) {
    return jwt.sign({ email }, process.env.JWT_SECRET_AUTH!, { expiresIn: '15s'});
  } 

  async login(loginDTO: LoginDTO, response: Response) {
    const { email, password } = loginDTO;
  
    const user = await this.userService.findOne(email);

    // Todo: Systematize the Errors into class base
    if (!user || user === null) throw Error(`There is no user with the email of ${email}`);

    const isAuthentic = compareSync(
      password,
      user.password
    );

    // Todo: use asymetric SRA 256 for the authentication
    // Todo: save both hashed public key and hashed refresh token to the DB for frequent rotation
    if (!isAuthentic) throw new Error(`Fail login`)
    const accessToken = this.generateToken(email);
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '5m'});
    
    response.cookie(process.env.REFRESH_TOKEN_COOKIE_KEY!, refreshToken, { httpOnly: true, 
      sameSite: 'none', /* secure: true, */ 
      maxAge: 24 * 60 * 60 * 1000 });
    return response.json({ accessToken });
  }

  async refreshToken(refreshToken: string) {
   
    const { email } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as jwt.JwtPayload;

    const user = await this.userService.findOne(email);
    if (!user || user === null) throw Error(`Invalid refresh token`);

    return {
      accessToken: this.generateToken(user.email),
    }
  }
}