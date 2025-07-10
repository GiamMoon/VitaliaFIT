import { Module } from '@nestjs/common';
import { WorkoutHistoryService } from './workout-history.service';
import { WorkoutHistoryController } from './workout-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutHistory } from './entities/workout-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutHistory])],
  controllers: [WorkoutHistoryController],
  providers: [WorkoutHistoryService],
})
export class WorkoutHistoryModule {}