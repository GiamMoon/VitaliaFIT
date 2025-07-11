import { WorkoutHistory } from 'src/workout-history/entities/workout-history.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum'; // Importa el enum

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

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User, // Por defecto, todos son usuarios normales
  })
  role: Role;

  // Nuevas columnas para las preferencias del onboarding
  @Column({ type: 'varchar', nullable: true })
  goal?: string; // Objetivo (ej: 'Perder peso')

  @Column({ type: 'varchar', nullable: true })
  experience?: string; // Nivel de experiencia (ej: 'Principiante')

  @Column({ type: 'varchar', nullable: true })
  preferences?: string; // Preferencia de ejercicio (ej: 'Yoga')
}
