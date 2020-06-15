import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, RelationId, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity'
import { Chat } from '../chats/chats.entity'
import { File } from '../files/file.entity'
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id: number;

  @Column()
  @ApiProperty()
  public text: string;

  @ManyToOne(() => User, (user: User) => user.messages)
  @JoinColumn({name: 'user_id'})
  public user: User;

  @Column()
  public user_id: number;

  @ManyToOne(() => Chat, (chat: Chat) => chat.messages)
  @JoinColumn({name: 'chat_id'})
  public chat: Chat;

  @Column()
  public chat_id: number;

  @ManyToOne(() => File, (file: File) => file.id)
  @JoinColumn({name: 'file_id'})
  public file: File[];

  @Column()
  public file_id: number;
  
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
