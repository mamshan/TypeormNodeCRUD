import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category, Post } from "../entity/Post" 
import { Order, OrderItems } from "../entity/Orders" 
import { Performa, PerformaItems } from "../entity/Performa" 
import { Shipment, ShipmentItems } from "../entity/shipmentModel"  
import { Clearnce, } from "../entity/clearnceModel"  
import { Users } from "../entity/Users"

///*

const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  username: "admin",
  password: "password",
  database: "WHEELS",
  synchronize: false,
  logging: true,
  entities: [Post, Category,Order,OrderItems, Users,Performa, PerformaItems,Shipment, ShipmentItems,Clearnce],
  subscribers: [],
  migrations: [],
})
//*/


/*
 const myDataSource = new DataSource({
  type: "sqlite",
  database: "./database.sqlite",
  synchronize: true,
  logging: true,
  entities: [Post, Category,Order,OrderItems, Users],
  subscribers: [],
  migrations: [],
})
*/
 
const myDataSource1 = new DataSource({
  type: "sqlite",
  database: "./database.sqlite",
  synchronize: true,
  logging: true,
  entities: [Post, Category,Order,OrderItems, Users],
  subscribers: [],
  migrations: [],
})



export { myDataSource, myDataSource1 }