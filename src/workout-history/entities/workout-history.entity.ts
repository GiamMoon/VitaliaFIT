import { User } from 'src/users/entities/user.entity';
import { Routine } from 'src/routines/entities/routine.entity';
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workout_history')
export class WorkoutHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'completed_at', type: 'timestamp' })
  completedAt: Date;

  @ManyToOne(() => User, (user) => user.workoutHistory)
  user: User;

  @ManyToOne(() => Routine, (routine) => routine.workoutHistory)
  routine: Routine;
}