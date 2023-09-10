import express from 'express';
import {
    register,
    getData,
    update,
    getLcno
      
} from '../controllers/lcttController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', register);
router.get('/', getData);  
router.put('/', update);
router.get('/:refNo', getLcno); 
export default router;