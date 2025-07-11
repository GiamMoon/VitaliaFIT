import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/users/enums/role.enum';
import { UsersService } from 'src/users/users.service';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard) // Protegemos todo el controlador
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  @Roles(Role.Admin) // Solo los Admins pueden acceder a esta ruta
  findAllUsers() {
    return this.usersService.findAll(); // Necesitaremos crear este método
  }
}