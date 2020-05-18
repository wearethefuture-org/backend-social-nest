import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'files' })
export class File {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id: number;

  @Column()
  @ApiProperty()
  public name: string;

  @Column()
  @ApiProperty()
  public url: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  public updatedAt: Date;
}
