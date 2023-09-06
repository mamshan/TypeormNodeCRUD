import { Column, Entity, PrimaryGeneratedColumn, JoinTable, OneToMany } from "typeorm"

import { Post } from "./Post"
  
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @OneToMany(() => Post, (post) =>(post.categories))
    @JoinTable()
    posts!: Post[]
}