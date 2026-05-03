import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProjectEntity } from '../project/project.entity';

@Entity()
export class CaseYearTargetsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => ProjectEntity, (project) => project.caseYearTargets)
  project: ProjectEntity;

  @Column()
  projectId: number; // внешний ключ
}
