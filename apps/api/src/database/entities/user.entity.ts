import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Workspace } from './workspace.entity';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Workspace, (workspace) => workspace.user)
  workspaces!: Workspace[];
}
