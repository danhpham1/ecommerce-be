import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:'varchar',
        length:'100',
        unique:true
    })
    role_name: string;

    @Column()
    created_at:Date;

    @Column()
    updated_at:Date;
}
