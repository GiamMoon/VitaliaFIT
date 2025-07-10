import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUrl()
  videoUrl: string;
}
