// src/users/dto/update-preferences.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdatePreferencesDto {
  @IsString()
  @IsOptional()
  goal?: string;

  @IsString()
  @IsOptional()
  experience?: string;

  @IsString()
  @IsOptional()
  preferences?: string;
}