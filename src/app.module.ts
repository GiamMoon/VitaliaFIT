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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Importa y configura el módulo de configuración
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Usa la URL de la base de datos si existe (en Render), si no, usa la config local
      url: process.env.DATABASE_URL, 
      ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, // Necesario para la conexión en Render
      entities: [User, Exercise, Routine, WorkoutHistory],
      synchronize: true, // Dejaremos esto en true por ahora para simplicidad
    }),
    UsersModule,
    AuthModule,
    ExercisesModule,
    RoutinesModule,
    WorkoutHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
