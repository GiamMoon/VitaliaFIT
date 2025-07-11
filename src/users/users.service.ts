import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // ... (métodos createFromAdmin, findOneByEmail, findAll se mantienen igual)
  async createFromAdmin(createUserDto: CreateUserAdminDto) {
    const userExists = await this.findOneByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException('El correo electrónico ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(newUser);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }
    return user;
  }

  // CORRECCIÓN: Usamos un método de actualización más directo y robusto.
  async update(id: number, updateDto: Partial<User>) {
    // Primero, nos aseguramos de que el usuario exista para lanzar un 404 si no.
    await this.findOne(id);
    // Luego, ejecutamos la operación de actualización directa en la base de datos.
    await this.userRepository.update(id, updateDto);
    // Devolvemos el usuario actualizado para confirmar los cambios.
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return { message: `User with ID #${id} has been removed` };
  }
}
