import { IsOptional, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export default class ResetPasswordDTO {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50, {
    each: true,
    message: 'Max length is 50'
  })
  newPassword: string;

}