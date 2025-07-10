import { WorkoutHistory } from 'src/workout-history/entities/workout-history.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('routines')
export class Routine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'duration_minutes' })
  durationMinutes: number;
  
  @OneToMany(() => WorkoutHistory, (history) => history.routine)
  workoutHistory: WorkoutHistory[];
}