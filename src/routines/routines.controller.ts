import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';

@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Post()
  create(@Body() createRoutineDto: CreateRoutineDto) {
    return this.routinesService.create(createRoutineDto);
  }

  @Get()
  findAll() {
    return this.routinesService.findAll();
  }

  @Get(':id') // Ruta para obtener una rutina por su ID, ej: /routines/1
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.routinesService.findOne(id);
  }
}