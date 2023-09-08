import express from 'express';
import { 
    getItems, 
} from '../controllers/itemController';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

 
router.get('/', getItems);   

export default router;