import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TenantService{
  constructor( private readonly prisma: PrismaService ){}

  create(createTenantDto: CreateTenantDto) {
    return this.prisma.tenant.create({
      data: createTenantDto
  });
  }

  findAll() {
    return `This action returns all tenant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: string) {
    return this.prisma.tenant.delete({
      where:{
        id: id,
      }
        
    });
  }
}
