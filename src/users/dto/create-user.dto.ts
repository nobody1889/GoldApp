import { IsString, IsEmail, IsOptional, IsBoolean, IsArray, IsUUID } from 'class-validator';

export class CreateUserProfileDto {
    @IsString()
    @IsOptional()
    avatarUrl?: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsEmail()
    @IsOptional()
    email?: string;
    
    @IsBoolean()
    @IsOptional()
    isEmailVerified?: boolean;

    @IsArray()
    @IsOptional()
    shippingAddresses?: string[];

    @IsString()
    @IsOptional()
    defaultShippingAddress?: string;

    @IsString()
    @IsUUID()
    tenantId: string;

}

export class CreateUserDto {
    @IsString()
    phoneNumber: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @IsString()
    @IsUUID()
    tenantId: number;

    @IsOptional()
    profile?: CreateUserProfileDto;
}
