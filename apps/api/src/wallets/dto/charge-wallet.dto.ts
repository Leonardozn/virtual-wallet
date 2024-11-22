import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class ChargeWalletDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  document: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @ApiProperty()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'amount must be at least 1' })
  @ApiProperty()
  amount: number;
}