import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm'; // Importar ILike
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Routine } from './entities/routine.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity'; // Importar Exercise
import { User } from 'src/users/entities/user.entity'; // Importar User

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

findAll(searchTerm?: string) {
    const findOptions = {
      relations: ['exercises'],
      where: searchTerm ? { name: ILike(`%${searchTerm}%`) } : {},
    };
    return this.routineRepository.find(findOptions);
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

  // Nuevo método para encontrar rutinas recomendadas
  findRecommended(user: User) {
    // Creamos una lista de términos de búsqueda a partir de las preferencias del usuario
    const searchTerms = [user.goal, user.experience, user.preferences].filter(Boolean); // Filtra valores null o undefined

    if (searchTerms.length === 0) {
      // Si no hay preferencias, devuelve las 5 rutinas más recientes como fallback
      return this.routineRepository.find({
        order: { id: 'DESC' },
        take: 5,
        relations: ['exercises'],
      });
    }

    // Busca rutinas donde el nombre contenga CUALQUIERA de los términos de búsqueda
    return this.routineRepository.find({
      where: searchTerms.map(term => ({ name: ILike(`%${term}%`) })),
      relations: ['exercises'],
    });
  }
}