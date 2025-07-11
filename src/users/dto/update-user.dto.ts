import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../enums/role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string; // Añadir este campo

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}