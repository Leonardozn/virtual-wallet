import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Min } from "class-validator";

export class UpdateWalletDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9a-fA-F]{24}$/, { message: 'user must be a valid ObjectId' })
  @IsOptional()
  @ApiPropertyOptional()
  client?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'amount must be at least 0' })
  @IsOptional()
  @ApiPropertyOptional()
  amount?: number;
}