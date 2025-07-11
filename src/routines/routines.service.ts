import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Routine } from './entities/routine.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity'; // Importar Exercise

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(Routine)
    private readonly routineRepository: Repository<Routine>,
  ) {}

  create(createRoutineDto: CreateRoutineDto) {
    const exercises = createRoutineDto.exerciseIds.map(id => ({ id } as Exercise));
    const newRoutine = this.routineRepository.create({
      ...createRoutineDto,
      exercises,
    });
    return this.routineRepository.save(newRoutine);
  }

  findAll() {
    // Incluimos la cuenta de ejercicios para mostrarla en la tabla
    return this.routineRepository.find({ relations: ['exercises'] });
  }

  async findOne(id: number) {
    const routine = await this.routineRepository.findOne({
      where: { id },
      relations: ['exercises'],
    });
    if (!routine) {
      throw new NotFoundException(`Routine with ID #${id} not found`);
    }
    return routine;
  }

  async update(id: number, updateRoutineDto: UpdateRoutineDto) {
    // Usamos preload para cargar la rutina y fusionar los nuevos datos
    const routine = await this.routineRepository.preload({
      id: id,
      ...updateRoutineDto,
      // CORRECCIÓN: Mapeamos los IDs a objetos que TypeORM puede relacionar
      exercises: updateRoutineDto.exerciseIds?.map(id => ({ id } as Exercise)),
    });

    if (!routine) {
      throw new NotFoundException(`Routine with ID #${id} not found`);
    }

    return this.routineRepository.save(routine);
  }

  async remove(id: number) {
    const routine = await this.findOne(id);
    await this.routineRepository.remove(routine);
    return { message: `Routine with ID #${id} has been removed` };
  }
}