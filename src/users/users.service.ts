import { Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserProfileDto } from './dto/create-user.dto';
import { UpdateUserProfileDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor( private readonly prisma : PrismaService) {};

  async upsertProfile(userId: string, updateDto: UpdateUserProfileDto) {
    // return this.prisma.userProfile.upsert({
    //   where: { userId: userId },
    //   create: {
    //     userId: userId,
    //     ...updateDto,
    //   },
    //   update: {
    //     ...updateDto,
    //   },
    // });
  }

  async getMyProfile(userId: string) {
    console.log(userId)
    return this.prisma.userProfile.findUnique({
      where: { userId: userId },
    });
  }
}

