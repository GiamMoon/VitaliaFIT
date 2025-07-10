import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkoutHistoryDto } from './dto/create-workout-history.dto';
import { WorkoutHistory } from './entities/workout-history.entity';

@Injectable()
export class WorkoutHistoryService {
  constructor(
    @InjectRepository(WorkoutHistory)
    private readonly historyRepository: Repository<WorkoutHistory>,
  ) {}

  create(createWorkoutHistoryDto: CreateWorkoutHistoryDto, userId: number) {
    const newHistoryEntry = this.historyRepository.create({
      user: { id: userId },
      routine: { id: createWorkoutHistoryDto.routineId },
    });
    return this.historyRepository.save(newHistoryEntry);
  }

  findAllByUserId(userId: number) {
    return this.historyRepository.find({
      where: { user: { id: userId } },
      relations: ['routine'], // Para que también traiga la info de la rutina
      order: { completedAt: 'DESC' },
    });
  }
}