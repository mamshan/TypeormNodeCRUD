import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import {Users} from '../entity/Users';
import { myDataSource } from "../config/database.providers"
import express, { Request, Response, NextFunction } from 'express';

const protect = asyncHandler(async (req : any, res, next) => {
  let token: any;

  console.log(req.cookie);
  
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
   

       
      const userRepository = myDataSource.getRepository(Users)
      req.user  = await userRepository.findOne({ where:  { id: decoded.userId }  })
      

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