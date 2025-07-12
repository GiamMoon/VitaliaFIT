import { Controller, Patch, Body, UseGuards, Req, Get } from '@nestjs/common'; // Añadir Get
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { UpdatePreferencesDto } from 'src/users/dto/update-preferences.dto';
import { Request } from 'express';
import { RoutinesService } from 'src/routines/routines.service'; // Importar RoutinesService
import { User } from 'src/users/entities/user.entity'; // Importar User

@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  constructor(
    private readonly usersService: UsersService,
    private readonly routinesService: RoutinesService, // Inyectar RoutinesService
  ) {}

  @Patch('preferences')
  updatePreferences(@Req() req: Request, @Body() updatePreferencesDto: UpdatePreferencesDto) {
    const user = req.user as { id: number };
    return this.usersService.update(user.id, updatePreferencesDto);
  }

  // Nueva ruta para obtener recomendaciones
  @Get('recommended-routines')
  getRecommendedRoutines(@Req() req: Request) {
    const user = req.user as User; // El objeto user completo ya está en la request
    return this.routinesService.findRecommended(user);
  }
}