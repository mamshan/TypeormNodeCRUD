import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category, Post } from "../entity/Post" 
import { Order, OrderItems } from "../entity/Orders" 
import { Performa, PerformaItems } from "../entity/Performa" 
import { Shipment, ShipmentItems } from "../entity/shipmentModel"  
import { Clearnce, } from "../entity/clearnceModel"  
import { Users } from "../entity/Users"
import { lc_tr } from "../entity/lcttModel"



const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  username: "genappsw_payroll",
  password: "w~WhF!-HuP5N",
  database: "genappsw_payroll",
  synchronize: true,
  logging: true,
  entities: [Post, Category,Order,OrderItems, Users,Performa, PerformaItems,Shipment, ShipmentItems,Clearnce,lc_tr],
  subscribers: [],
  migrations: [],
})





 const myDataSource1 = new DataSource({
  type: "sqlite",
  database: "./database.sqlite",
  synchronize: false,
  logging: true,
  entities: [Post, Category,Order,OrderItems, Users],
  subscribers: [],
  migrations: [],
})

 



export { myDataSource, myDataSource1 }