import asyncHandler from 'express-async-handler'; 
import path from 'path';
import multer from 'multer';
import { myDataSource } from "../config/database.providers"
 


const getFiles = asyncHandler(async (req, res) => {

  const __dirname = path.resolve();
 

  const uploadsDirectory = path.join(__dirname, 'uploads/');

  const queryRunner = myDataSource.createQueryRunner();
   

  const brands = await queryRunner.manager.query("select * from files where docid='" + req.query.docid +  "' and doctype='" + req.query.doctype + "'");

  const items = [];
    for (const result of brands) {
      const item = {
        id:result.id,
        reference: result.reference,
        filename: 'uploads/' + result.filename,
      };
      items.push(item);
    }
  


  if (brands) {

    res.json({
     files: items, 
    });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});


 
const deleteFile = asyncHandler(async (req, res) => {

  const __dirname = path.resolve();
 

  const uploadsDirectory = path.join(__dirname, 'uploads/');
  const queryRunner = myDataSource.createQueryRunner();

   const deleteQ = await queryRunner.manager.query("delete  from files where id='" + req.query.docid +  "' and doctype='" + req.query.doctype + "'");


  const brands = await queryRunner.manager.query("select * from files where docid='" + req.query.docid +  "' and doctype='" + req.query.doctype + "'");

  const items = [];
    for (const result of brands) {
      const item = {
        id:result.id,
        reference: result.reference,
        filename: 'uploads/' + result.filename,
      };
      items.push(item);
    }
  


  if (brands) {

    res.json({
     files: items, 
    });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});



export {  
  getFiles, 
  deleteFile,
};