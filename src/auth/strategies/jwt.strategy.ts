import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'VITALIAFIT_SECRET_KEY',
    });
  }

  async validate(payload: { sub: number; email: string }) {
     const user = await this.usersService.findOneByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException();
      }
      // Devolvemos el usuario completo, que ya incluye el rol
      return user;
  }
}