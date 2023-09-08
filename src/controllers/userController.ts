import { Users } from "../entity/Users"
import { myDataSource } from "../config/database.providers"
import asyncHandler from 'express-async-handler'
import { Request, Response,  } from 'express';
import jwt from 'jsonwebtoken';
import generateToken from '../utils/generateToken';

const authUser = asyncHandler(async (req, res) => {

    const { username, password } = req.body
    const userRepository = myDataSource.getRepository(Users)
    const user = await userRepository.findOne({ where:  { name: username }  })

    if (user && (await user.matchPassword(password))) {
        
         
        generateToken(res, user.id,user.name);
        
        res.json({
            id: user.id,
            name: user.name,
            username: user.email,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const getUserProfile = asyncHandler(async (req: any, res: Response) => {
  
    let token;

    token = req.cookies.jwt;
      
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    const userRepository = myDataSource.getRepository(Users)
    const user = await userRepository.findOne({ where:  { id: req.user.id }  })
 
    
  
    if (user) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

  
export {
    authUser, 
    getUserProfile
};