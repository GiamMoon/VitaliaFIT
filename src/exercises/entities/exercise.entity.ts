// src/exercises/entities/exercise.entity.ts
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Routine } from 'src/routines/entities/routine.entity';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'video_url' })
  videoUrl: string;

  // Nueva columna para la imagen
  @Column({ type: 'varchar', length: 255, nullable: true })
  imageUrl: string;

  @ManyToMany(() => Routine, (routine) => routine.exercises)
  routines: Routine[];
}