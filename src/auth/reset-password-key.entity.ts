import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {User} from "../users/user.entity";


@Entity({ name: 'reset_password_keys' })
export class ResetPasswordKeyEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id: number;

    @Column()
    @ApiProperty()
    public key: string;

    @Column({nullable:true})
    userId: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}