import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export default class ForgetPasswordDTO {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  email: string;
}