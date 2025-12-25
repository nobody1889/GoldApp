import { IsString } from 'class-validator'

export class CreateTenantDto{
    @IsString()
    subdomain: string;

    @IsString()
    name: string;
}