import { Controller, Get, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserProfileDto } from './dto/create-user.dto';
import { UpdateUserProfileDto } from './dto/update-user.dto';

@Controller('profile')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch()
  async upsetMyProfile(
    @Req() req: any,
    @Body() updateDto: UpdateUserProfileDto,
  ) {
    const userId = req.user.sub;
    return this.usersService.upsertProfile(userId, updateDto);
  }


  @Get()
  async getMyProfile(@Req() req: any) {
    const userId = req.user.sub;
    return this.usersService.getMyProfile(userId);
  }
}
