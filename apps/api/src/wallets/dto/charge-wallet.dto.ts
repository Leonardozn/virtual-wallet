import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class ChargeWalletDto {
  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'amount must be at least 1' })
  amount: number;
}