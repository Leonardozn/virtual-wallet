import { IsNotEmpty, IsNumber, IsString, Matches, Min } from "class-validator";

export class CreateWalletDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9a-fA-F]{24}$/, { message: 'user must be a valid ObjectId' })
  client: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'amount must be at least 0' })
  amount: number;
}