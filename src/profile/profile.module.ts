import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule], // Importamos UsersModule para tener acceso a UsersService
  controllers: [ProfileController],
})
export class ProfileModule {}