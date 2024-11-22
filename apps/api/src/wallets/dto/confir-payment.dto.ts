import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ConfirmPaymentWalletDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;
}