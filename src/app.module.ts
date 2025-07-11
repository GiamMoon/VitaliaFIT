import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { AdminModule } from './admin/admin.module';
import { ProfileModule } from './profile/profile.module'; // Importa el nuevo módulo

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        ssl: configService.get<string>('DATABASE_URL')
          ? { rejectUnauthorized: false }
          : false,
        entities: [User, Exercise, Routine, WorkoutHistory],
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
    ExercisesModule,
    RoutinesModule,
    WorkoutHistoryModule,
    AdminModule,
    ProfileModule, // Añade el ProfileModule aquí
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}