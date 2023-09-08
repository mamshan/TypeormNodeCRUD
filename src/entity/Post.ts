import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm" 
  
  @Entity()
 class Category {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @OneToMany(() => Post, (post) =>(post.categories))
    @JoinTable()
    posts!: Post[]
}


  @Entity()
  class Post {
    @PrimaryGeneratedColumn()
      id!: number
  
    @Column()
      title!: string
  
    @Column("text")
      text!: string
  


    @ManyToOne(() => Category, (category) => category.posts)
    @JoinTable()
    categories!: Category[]
  }

export {Post, Category}