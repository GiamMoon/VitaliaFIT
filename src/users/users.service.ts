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

  // CORRECCIÓN: Usamos el método `preload` para una actualización más segura y robusta.
  async update(id: number, updateDto: Partial<User>) {
    // Preload busca el usuario por ID y fusiona los nuevos datos del DTO.
    const userToUpdate = await this.userRepository.preload({
      id: id,
      ...updateDto,
    });

    // Si preload no encuentra el usuario, devuelve undefined.
    if (!userToUpdate) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }

    // Guardamos la entidad ya fusionada.
    return this.userRepository.save(userToUpdate);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return { message: `User with ID #${id} has been removed` };
  }
}