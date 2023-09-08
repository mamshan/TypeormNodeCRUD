import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';


@Entity()
export class ParentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ChildEntity, (child) => child.parent)
  children: ChildEntity[];
}

@Entity()
export class ChildEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => ParentEntity, (parent) => parent.children)
  parent: ParentEntity;
}
