import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  // Esta línea permite que otros módulos que importen UsersModule usen UsersService.
  exports: [UsersService],
})
export class UsersModule {}