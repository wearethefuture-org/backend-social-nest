import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({name: 'first_name'})
  public firstName: string;

  @Column({name: 'last_name'})
  public lastName: string;

  @Column()
  public email: string;
}
