import { IsNotEmpty, IsString } from "class-validator";

export class ConfirmPaymentWalletDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}