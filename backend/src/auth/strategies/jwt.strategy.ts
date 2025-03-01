import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_SECRET') || 'default_secret_key',
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.userService.findOne(payload.sub);
      return {
        userId: payload.sub,
        username: payload.username,
        role: payload.role,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
