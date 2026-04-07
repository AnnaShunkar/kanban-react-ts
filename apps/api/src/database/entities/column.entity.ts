import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './task.entity';
import { Workspace } from './workspace.entity';

@Entity({ name: 'Column' })
export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  workspaceId!: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.columns, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workspaceId' })
  workspace!: Workspace;

  @OneToMany(() => Task, (task) => task.column)
  tasks!: Task[];
}
