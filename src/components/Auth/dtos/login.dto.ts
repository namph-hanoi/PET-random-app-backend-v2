import { IsOptional, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export default class LoginDTO {
  @IsOptional()
  @MinLength(8)
  @MaxLength(50)
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50, {
    each: true,
    message: 'Max length is 50'
  })
  password: string;

}