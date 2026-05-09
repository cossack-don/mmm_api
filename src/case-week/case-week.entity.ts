import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProjectEntity } from '../project/project.entity';

@Entity()
export class CaseWeekEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: null })
  day: number;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => ProjectEntity, (project) => project.caseWeek)
  project: ProjectEntity;

  @Column()
  projectId: number; // внешний ключ
}
