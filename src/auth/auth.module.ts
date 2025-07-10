import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'VITALIAFIT_SECRET_KEY', // ¡En un proyecto real, esto debe ser una variable de entorno!
      signOptions: { expiresIn: '1d' }, // El token expira en 1 día
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // AuthService y JwtStrategy
})
export class AuthModule {}