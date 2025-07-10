import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}