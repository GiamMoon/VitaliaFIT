import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto'; // Importar

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

  async findOneByEmail(email: string): Promise<User | null> {
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

    async update(id: number, updateUserDto: UpdateUserDto) {
      const user = await this.findOne(id);
      this.userRepository.merge(user, updateUserDto);
      return this.userRepository.save(user);
    }

    async remove(id: number) {
      const user = await this.findOne(id);
      await this.userRepository.remove(user);
      return { message: `User with ID #${id} has been removed` };
    }
  }


