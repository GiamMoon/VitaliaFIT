import { Controller, Get, UseGuards, Patch, Param, Body, Delete, ParseIntPipe, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/users/enums/role.enum';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto'; // Importar
import { CreateUserAdminDto } from 'src/users/dto/create-user-admin.dto';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.Admin)
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  findAllUsers() {
    return this.usersService.findAll();
  }

  @Patch('users/:id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('users/:id')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
  @Post('users')
  createUser(@Body() createUserDto: CreateUserAdminDto) {
    return this.usersService.createFromAdmin(createUserDto);
  }
} 