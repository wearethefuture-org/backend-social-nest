import {
  Column, CreateDateColumn,
  Entity, JoinColumn, OneToOne,
  PrimaryGeneratedColumn, RelationId, UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { File } from '../files/file.entity';


@Entity({ name: 'chats' })
export class Chats {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id: number;

  @Column({
    name: 'name',
    nullable: false
  })
  @ApiProperty()
  public name: string;

  @Column({
    name: 'description',
    nullable: true
  })
  @ApiProperty()
  public description: string;

  @Column({
    name: 'available',
    insert: false,
    default:true
  })
  @ApiProperty()
  public available: boolean;

  @RelationId((chats: Chats) => chats.logo)
  @ApiProperty()
  public logoId: number;

  @OneToOne(
    () => File,
    file => file,
    {
      eager: true,
      nullable: true,
    }
  )
  @JoinColumn({
    name: 'logo_id',
  })
  @ApiProperty()
  public logo: File;

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

  @Column({
    name: 'owner_id',
    insert: true
  })
  @ApiProperty()
  public ownerId: number;

}
