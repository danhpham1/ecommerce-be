import { Role } from './Role';
import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    address:string;

    @Column()
    full_name:string;

    @Column()
    is_active:boolean;

    @Column()
    created_at:Date;

    @Column()
    updated_at:Date;

    @OneToOne(()=>Role)
    @JoinColumn()
    role_id:Role;

}
