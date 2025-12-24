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
    const profile = await this.prisma.userProfile.findFirst({
      where: {
        phoneNumber,
        tenantId,
      },
      include: {
        user: true,
      },
    });
    
    if (!profile || !profile?.user?.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(
      password,
      profile.user.passwordHash,
    );

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!profile.user.isActive) {
      throw new UnauthorizedException('User is inactive');
    }

    return profile;
  }

  async login(body: { phoneNumber: string; password: string; tenantId: string }) {
    const profile = await this.validateUser(
      body.phoneNumber,
      body.password,
      body.tenantId,
    );

    const payload = {
      sub: profile.user.id,
      email: profile.email,
      tenantId: profile.tenantId,
    };

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
