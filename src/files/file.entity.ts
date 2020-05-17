import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'files' })
export class File {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public url: string;

  @CreateDateColumn({name: 'created_at'})
  public createdAt: Date

  @UpdateDateColumn({name: 'updated_at'})
  public updatedAt: Date
}
