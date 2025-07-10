import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Routine } from 'src/routines/entities/routine.entity';
import { ManyToMany } from 'typeorm';

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

  @ManyToMany(() => Routine, (routine) => routine.exercises)
  routines: Routine[];
}