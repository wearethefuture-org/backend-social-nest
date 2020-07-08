import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from '../messages/messages.entity'
import { User } from '../users/user.entity'
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'chats' })
export class Chat {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id: number;

  @Column({
    default: 'My Chat'
  })
  @ApiProperty()
  public name: string;

  @Column({
    default: ''
  })
  @ApiProperty()
  public description: string;

  @Column({
    default: true
  })
  @ApiProperty()
  public available: boolean;

  @ManyToOne(() => User, (user: User) => user.id, {
    eager: true
  })
  @JoinColumn({name: 'owner_id'})
  public owner: User;

  @Column()
  public owner_id: number;

  @ManyToOne(() => User, (user: User) => user.id, {
    eager: true
  })
  @JoinColumn({name: 'partner_id'})
  public partner: User;

  @Column()
  public partner_id: number;

  @OneToMany(() => Message, (message: Message) => message.chat_id)
  @JoinColumn({name: 'id'})
  public messages: Message[];

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
