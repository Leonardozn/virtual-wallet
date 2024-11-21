import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  phone: string;
}