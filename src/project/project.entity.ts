import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CaseYearEntity } from '../case-year/case-year.entity';
import { CaseYearTargetsEntity } from '../case-year-target/case-year-targets.entity';

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  isDeleted?: boolean;

  @OneToMany(() => CaseYearEntity, (caseYear) => caseYear.project)
  caseYears: CaseYearEntity[];

  @OneToMany(
    () => CaseYearTargetsEntity,
    (caseYearTargets) => caseYearTargets.project,
  )
  caseYearTargets: CaseYearTargetsEntity[];
}
