import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm"
import bcrypt from 'bcryptjs';

@Entity({ name : "Users"})
export class Users {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        this.password = await bcrypt.hash(this.password, 10);
    }
  
    @BeforeUpdate()
    async hashPasswordBeforeUpdate() {
        if (this.password) {
        this.password = await bcrypt.hash(this.password, 10);
        }
    }


    async matchPassword(enteredPassword: string): Promise<boolean> {
        return await bcrypt.compare(enteredPassword, this.password);
    }

}