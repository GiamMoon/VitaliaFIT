import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRoutineDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  durationMinutes: number;

  @IsArray()
  @IsNumber({}, { each: true })
  exerciseIds: number[];

  @IsString()
  @IsOptional()
  imageUrl?: string;
}
