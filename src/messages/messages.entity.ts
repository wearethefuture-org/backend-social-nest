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

  // @RelationId((message: Message) => message.user)
  // @ApiProperty()
  // public userId: number;

  @ManyToOne(() => User, (user: User) => user.messages)
    user: User;
  @JoinColumn({ 
    name: 'user_id', 
  })
  // public user: User[];

  @ManyToOne(() => Chat, (chat: Chat) => chat.messages)
    chat: Chat;
  @JoinColumn({ 
    name: 'chat_id'
  })

  @OneToMany(() => File, (file: File) => file.id)
    file: File[];
  @JoinColumn({ 
    name: 'file_id'
  })
  
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