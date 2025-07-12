import { Module, forwardRef } from '@nestjs/common';
import { RoutinesService } from '../routines/routines.service';
import { RoutinesController } from '../routines/routines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Routine } from '../routines/entities/routine.entity';
import { ExercisesModule } from 'src/exercises/exercises.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Routine]),
    forwardRef(() => ExercisesModule),
  ],
  controllers: [RoutinesController],
  providers: [RoutinesService],
  exports: [RoutinesService], // <-- AÑADE ESTA LÍNEA
})
export class RoutinesModule {}
