import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    phoneNumber: string,
    password: string,
    tenantId: string,
  ) {
    const user = await this.prisma.user.findFirst({
      where: {
        phoneNumber,
        tenantId,
      },
    });
    
    if (!user || !user?.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(
      password,
      user.passwordHash,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive');
    }

    return user;
  }

  async login(body: { phoneNumber: string; password: string; tenantId: string }) {
    const user = await this.validateUser(
      body.phoneNumber,
      body.password,
      body.tenantId,
    );

    const payload = {
      sub: user.id,
      phone: user.phoneNumber,
      tenantId: user.tenantId,
    };

    // const payload = {
    //   sub: profile.user.id,
    //   email: profile.email,
    //   tenantId: profile.tenantId,
    // };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async foundAll(id: string) {
    return await this.prisma.user.findMany(
      {
        where: {
          id,
          tenantId: id,
        },
      }
    );
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique(
      {
         where: { 
          id,
          tenantId: id,
         } 
        }
      );
  }
}
