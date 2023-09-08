import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category, Post } from "../entity/Post" 
import { Order, OrderItems } from "../entity/Orders" 
import { Users } from "../entity/Users"

export const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  username: "admin",
  password: "password",
  database: "WHEELS",
  synchronize: false,
  logging: true,
  entities: [Post, Category, Users,Order,OrderItems],
  subscribers: [],
  migrations: [],
})


/*
export const myDataSource = new DataSource({
  type: "sqlite",
  database: "./database.sqlite",
  synchronize: false,
  logging: true,
  entities: [Post, Category, Users],
  subscribers: [],
  migrations: [],
})
*/
