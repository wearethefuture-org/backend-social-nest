import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  RelationId,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File } from '../files/file.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @RelationId((user: User) => user.avatar)
  public avatarId: number;

  @OneToOne(
    type => File,
    file => file,
    {
      eager: true,
      nullable: true,
    }
  )
  @JoinColumn({
    name: 'avatar_id',
  })
  public avatar: File;

  @Column({
    name: 'first_name',
    nullable: false,
  })
  public firstName: string;

  @Column({
    name: 'last_name',
    nullable: false,
  })
  public lastName: string;

  @Column({
    name: 'user_name',
    nullable: false,
  })
  public userName: string;

  @Column({
    nullable: false,
    unique: true,
  })
  public email: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  public updatedAt: Date;
}
