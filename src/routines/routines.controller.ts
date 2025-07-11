import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';

@Controller('routines')
// CORRECCIÓN: Eliminamos la protección a nivel de controlador de aquí
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  // Esta ruta ahora es pública, cualquiera puede ver las rutinas
  @Get()
  findAll() {
    return this.routinesService.findAll();
  }

  // Las siguientes rutas SÍ necesitan protección
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  create(@Body() createRoutineDto: CreateRoutineDto) {
    return this.routinesService.create(createRoutineDto);
  }

  @Get(':id')
  // Esta ruta también puede ser pública para que los usuarios vean los detalles
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.routinesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRoutineDto: UpdateRoutineDto) {
    return this.routinesService.update(id, updateRoutineDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.routinesService.remove(id);
  }
}