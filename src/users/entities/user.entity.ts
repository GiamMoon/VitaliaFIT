import { WorkoutHistory } from 'src/workout-history/entities/workout-history.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Le dice a TypeORM que esta clase mapea a la tabla 'users'
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'full_name' }) // Mapea a la columna 'full_name'
  fullName: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => WorkoutHistory, (history) => history.user)
  workoutHistory: WorkoutHistory[];
}
