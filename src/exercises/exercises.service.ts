import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto'; // Importar
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

  // Nuevo método para encontrar un ejercicio
  async findOne(id: number) {
    const exercise = await this.exerciseRepository.findOneBy({ id });
    if (!exercise) {
      throw new NotFoundException(`Exercise with ID #${id} not found`);
    }
    return exercise;
  }

  // Nuevo método para actualizar
  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    const exercise = await this.findOne(id); // Reutilizamos findOne para verificar que existe
    this.exerciseRepository.merge(exercise, updateExerciseDto);
    return this.exerciseRepository.save(exercise);
  }

  // Nuevo método para eliminar
  async remove(id: number) {
    const exercise = await this.findOne(id);
    await this.exerciseRepository.remove(exercise);
    return { message: `Exercise with ID #${id} has been removed` };
  }
}