import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  RelationId,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File } from '../files/file.entity';
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

  @ManyToOne((type:any) => User)
  @JoinColumn()
  owner: User;



  // @OneToOne(
  //   () => File,
  //   file => file,
  //   {
  //     eager: true,
  //     nullable: true,
  //   }
  // )
  // @JoinColumn({
  //   name: 'avatar_id',
  // })

  @Column({
    default: true
  })
  @ApiProperty()
  public available: boolean;

  @RelationId((chat: Chat) => chat.owner)
  @ApiProperty()
  public owner_id: number;

  @Column()
  @ApiProperty()
  public partner_id: number;

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

  @OneToMany(() => Message, (message: Message) => message.chat)
    messages: Message[];
}
