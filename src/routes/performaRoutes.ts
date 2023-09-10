import express from 'express';
import {
    register,
    getData,
    update
} from '../controllers/performaController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', register);
router.get('/', getData);  
router.put('/', update);

export default router;