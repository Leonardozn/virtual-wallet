import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class PayWalletDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'amount must be at least 1' })
  amount: number;
}