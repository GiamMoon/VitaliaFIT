import { Controller, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { UpdatePreferencesDto } from 'src/users/dto/update-preferences.dto';
import { Request } from 'express';

@Controller('profile')
@UseGuards(AuthGuard('jwt')) // Protegemos todo el controlador
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('preferences')
  updatePreferences(@Req() req: Request, @Body() updatePreferencesDto: UpdatePreferencesDto) {
    const user = req.user as { id: number };
    return this.usersService.update(user.id, updatePreferencesDto);
  }
}