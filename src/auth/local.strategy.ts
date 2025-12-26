import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'phoneNumber', // or 'email'
    });
  }

  async validate(phoneNumber: string, password: string, tenantId: string) {
    const user = await this.authService.validateUser(phoneNumber, password, tenantId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
