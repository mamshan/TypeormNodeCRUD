import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import {User} from '../entity/User';
import { myDataSource } from "../config/database.providers"

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

       
      const userRepository = myDataSource.getRepository(User)
      const user = await userRepository.findOne({ where:  { id: decoded.userId }  })


      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };