 
 
import express from "express";
import { Request, Response } from "express"
import path from 'path'; 
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); 
import userRoutes from './routes/userRoutes';

const app = express()
app.use(express.json())


const port =   5000;
var corsOptions = {
  origin: true,
  credentials: true
}

app.use(cors(corsOptions));
 
app.use('/api/users', userRoutes);

import { Post } from "./entity/Post"
import { Category } from "./entity/Category"
import { User } from "./entity/User"
import { myDataSource } from "./config/database.providers"

myDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

    /*
// register routes
app.get("/users", async function (req: Request, res: Response) {
  const userRepository = myDataSource.getRepository(Category)

  const users = await userRepository.find({
    relations: {
      posts: true,
    },
})


  res.json(users)
})

*/

app.get('/', (req, res) => {
    res.send('API is running....');
  });

  app.listen(port, () => console.log(`Server started on port ${port}`));