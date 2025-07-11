import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';

@Controller('routines')
@UseGuards(AuthGuard('jwt'), RolesGuard) // Protegemos todo el controlador
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createRoutineDto: CreateRoutineDto) {
    return this.routinesService.create(createRoutineDto);
  }

  @Get()
  findAll() {
    return this.routinesService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.routinesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRoutineDto: UpdateRoutineDto) {
    return this.routinesService.update(id, updateRoutineDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.routinesService.remove(id);
  }
}