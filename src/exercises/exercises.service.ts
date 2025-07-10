import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
  ) {}

  create(createExerciseDto: CreateExerciseDto) {
    const newExercise = this.exerciseRepository.create(createExerciseDto);
    return this.exerciseRepository.save(newExercise);
  }

  findAll() {
    return this.exerciseRepository.find();
  }
}
