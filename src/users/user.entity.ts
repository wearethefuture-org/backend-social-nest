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
import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum, UserStatusEnum } from './user.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id: number;

  @RelationId((user: User) => user.avatar)
  @ApiProperty()
  public avatarId: number;

  @OneToOne(
    () => File,
    file => file,
    {
      eager: true,
      nullable: true,
    }
  )
  @JoinColumn({
    name: 'avatar_id',
  })
  @ApiProperty()
  public avatar: File;

  @Column({
    name: 'first_name',
    nullable: false
  })
  @ApiProperty()
  public firstName: string;

  @Column({
    name: 'last_name',
    nullable: false,
  })
  @ApiProperty()
  public lastName: string;

  @Column({
    name: 'user_name',
    nullable: false,
  })
  @ApiProperty()
  public userName: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @ApiProperty()
  public email: string;

  @Column()
  @ApiProperty()
  public password: string;

  @Column({
    name: 'status',
    enum: UserStatusEnum,
    insert: true,
    default: UserStatusEnum.pending
  })
  @ApiProperty({
    enum: UserStatusEnum
  })
  public status: string;

  @Column({
    name: 'role',
    enum: UserRoleEnum,
    insert: true,
    default: UserRoleEnum.user
  })
  @ApiProperty({
    enum: UserRoleEnum
  })
  public role: string;

  @Column({
    name: 'disabled',
    insert: true,
    default: false
  })
  @ApiProperty()
  public disabled: boolean;

  @Column({
    name: 'birthday_date'
  })
  @ApiProperty()
  public birthdayDate: Date;

  @CreateDateColumn({
    name: 'created_at'
  })
  @ApiProperty()
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  })
  @ApiProperty()
  public updatedAt: Date;
}
