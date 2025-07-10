import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { ExercisesModule } from './exercises/exercises.module';
import { RoutinesModule } from './routines/routines.module';
import { Exercise } from './exercises/entities/exercise.entity';
import { Routine } from './routines/entities/routine.entity';
import { WorkoutHistoryModule } from './workout-history/workout-history.module';
import { WorkoutHistory } from './workout-history/entities/workout-history.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'vitaliafit_db',
      entities: [User, Exercise, Routine, WorkoutHistory], // Añadir WorkoutHistory
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ExercisesModule,
    RoutinesModule,
    WorkoutHistoryModule, // Añadir el módulo
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
