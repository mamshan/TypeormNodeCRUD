import express from 'express';
import multer from 'multer';
import path from 'path'; 
import { 
    getFiles, 
	deleteFile,
} from '../controllers/fileUpload';
import { myDataSource } from "../config/database.providers"
 

 
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage })
 


  router.post("/", upload.array("files"),uploadFiles);


  router.get('/', getFiles);   
 router.delete('/', deleteFile);   




  async function uploadFiles(req, res) {
     
      const files = req.files; // Get the uploaded files

      const queryBuilder = myDataSource.createQueryBuilder();
        
    
        const fileData = files.map(file => [
            file.filename,
            file.originalname,
            req.body.docid,
            req.body.doctype
          ]);
      
          try {

          
          await queryBuilder
            .insert()
            .into('files')
            .values(fileData)
            .execute();


          res.json({
            files:  req.files, 
           });

        } catch (error) {
            console.error('Error storing file data in MySQL:', error);
            res.status(500).send('Error storing file data in MySQL');
         }
    }
          
     
     

   
export default router;