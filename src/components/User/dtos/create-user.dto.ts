import { IsOptional, IsNotEmpty, Matches, MaxLength, MinLength, IsIn } from "class-validator";

export const userRoles = ['user', 'admin', 'root'];

export default class CreateUserDto {
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

  @IsOptional()
  @IsIn(userRoles, {message: 'The role is not defined'})
  role: string
}