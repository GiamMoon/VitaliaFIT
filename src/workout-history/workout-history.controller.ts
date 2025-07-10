import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { WorkoutHistoryService } from './workout-history.service';
import { CreateWorkoutHistoryDto } from './dto/create-workout-history.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt')) // ¡Protege todas las rutas de este controlador!
@Controller('workout-history')
export class WorkoutHistoryController {
  constructor(private readonly workoutHistoryService: WorkoutHistoryService) {}

  @Post()
  create(@Body() createWorkoutHistoryDto: CreateWorkoutHistoryDto, @Req() req: Request) {
    const user = req.user as { id: number }; // Obtenemos el usuario del token
    return this.workoutHistoryService.create(createWorkoutHistoryDto, user.id);
  }

  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as { id: number };
    return this.workoutHistoryService.findAllByUserId(user.id);
  }
}
