import { IsString, IsEmail, IsOptional, IsBoolean, IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsNumber()
  code: number;

  @IsString()
  neighborhood: string;

  @IsNumber()
  houseNumber: number;

  @IsNumber()
  floor: number;
}

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  shippingAddresses?: AddressDto[];

  @IsOptional()
  @IsString()
  @Type(() => AddressDto)
  defaultShippingAddress?: AddressDto;
}