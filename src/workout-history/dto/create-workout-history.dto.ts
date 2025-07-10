import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWorkoutHistoryDto {
  @IsNotEmpty()
  @IsNumber()
  routineId: number;
}
