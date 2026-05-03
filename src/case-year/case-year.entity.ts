import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProjectEntity } from '../project/project.entity';

@Entity()
export class CaseYearEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: null })
  keyQ: string;

  @Column({ default: null })
  month: number;

  @ManyToOne(() => ProjectEntity, (project) => project.caseYears)
  project: ProjectEntity;

  @Column()
  projectId: number; // внешний ключ
}
