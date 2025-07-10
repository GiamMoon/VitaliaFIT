import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService, // Inyectar JwtService
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.usersService.findOneByEmail(loginAuthDto.email);

    if (!user || !(await bcrypt.compare(loginAuthDto.password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Excluimos la contraseña del objeto de usuario
    const { password, ...result } = user;

    const payload = { sub: user.id, email: user.email };
    return {
      ...result,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(userObject: RegisterAuthDto) {
    const { email, password, fullName } = userObject;

    const userExists = await this.usersService.findOneByEmail(email);
    if (userExists) {
      throw new UnauthorizedException('El correo electrónico ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.usersService.create({
      email,
      password: hashedPassword,
      fullName,
    });
  }
}
