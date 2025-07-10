import { Injectable } from '@nestjs/common';
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
    const newRoutine = this.routineRepository.create(createRoutineDto);
    return this.routineRepository.save(newRoutine);
  }

  findAll() {
    return this.routineRepository.find();
  }
}
