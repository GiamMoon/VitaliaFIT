// CORRECCIÓN: Se añade NotFoundException
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { Routine } from './entities/routine.entity';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,
  ) {}

  create(createRoutineDto: CreateRoutineDto) {
    const exercises = createRoutineDto.exerciseIds.map(id => ({ id }));
    const newRoutine = this.routineRepository.create({
      ...createRoutineDto,
      exercises,
    });
    return this.routineRepository.save(newRoutine);
  }

  findAll() {
    return this.routineRepository.find();
  }

  // CORRECCIÓN: Método más robusto con manejo de errores explícito
  async findOne(id: number) {
    const routine = await this.routineRepository.findOne({
      where: { id },
      relations: ['exercises'], // ¡Importante! Carga la relación
    });

    if (!routine) {
      throw new NotFoundException(`Routine with ID #${id} not found`);
    }

    return routine;
  }
}
