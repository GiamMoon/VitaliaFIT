import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { UsersModule } from 'src/users/users.module';
import { RoutinesModule } from 'src/routines/routines.module'; // Importar

@Module({
  imports: [UsersModule, RoutinesModule], // Añadir RoutinesModule
  controllers: [ProfileController],
})
export class ProfileModule {}