import "reflect-metadata"
import { DataSource } from "typeorm"
import { Post } from "../entity/Post"
import { Category } from "../entity/Category"
import { User } from "../entity/User"
export const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  username: "admin",
  password: "password",
  database: "WHEELS",
  synchronize: true,
  logging: true,
  entities: [Post, Category, User],
  subscribers: [],
  migrations: [],
})

