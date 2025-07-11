import { WorkoutHistory } from 'src/workout-history/entities/workout-history.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { JoinTable, ManyToMany } from 'typeorm';

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

  @ManyToMany(() => Exercise)
  @JoinTable() // TypeORM creará la tabla de unión automáticamente
  exercises: Exercise[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageUrl: string;
}