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

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

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

  // CORRECCIÓN DEFINITIVA: Usamos el método .update() directo.
  async update(id: number, updateDto: Partial<User>) {
    // El método .update() de TypeORM ejecuta una consulta UPDATE directa.
    // Es más eficiente y menos propenso a errores para actualizaciones parciales.
    const result = await this.userRepository.update(id, updateDto);

    // Verificamos si alguna fila fue afectada para saber si el usuario existía.
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }

    // Devolvemos el usuario actualizado para confirmar los cambios.
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return { message: `User with ID #${id} has been removed` };
  }
}
