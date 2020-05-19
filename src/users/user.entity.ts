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

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id: number;

  @RelationId((user: User) => user.avatar)
  @ApiProperty()
  public avatarId: number;

  @OneToOne(
    type => File,
    file => file,
    {
      eager: true,
      nullable: true,
    },
  )
  @JoinColumn({
    name: 'avatar_id',
  })
  @ApiProperty()
  public avatar: File;

  @Column({
    name: 'first_name',
    nullable: false,
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

  @Column({
    name: 'password',
  })
  @ApiProperty()
  public password: string;

  @Column({
    name: 'status',
    enum: ['pending', 'confirmed', 'invited'],
    insert: true,
    default: 'pending'
  })
  @ApiProperty({
    enum: ['pending', 'confirmed', 'invited']
  })
  public status: string;

  @Column({
    name: 'role',
    enum: ['user', 'admin', 'superadmin'],
    insert: true,
    default: 'user'
  })
  @ApiProperty({
    enum: ['user', 'admin', 'superadmin']
  })
  public role: string;

  @Column({
    name: 'disabled',
    type: 'boolean',
    insert: true,
    default: false
  })
  @ApiProperty()
  public disabled: boolean;

  @Column({
    name: 'birthday_date',
  })
  @ApiProperty()
  public birthdayDate: Date;

  @CreateDateColumn({
    name: 'created_at',
  })
  @ApiProperty()
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  @ApiProperty()
  public updatedAt: Date;
}
