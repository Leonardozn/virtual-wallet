import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateClientDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  document?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  name?: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @IsOptional()
  @ApiPropertyOptional()
  phone?: string;
}
