import express from 'express';
import {
    registerOrder,
    getOrders,
    updateOrders
} from '../controllers/orderController';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerOrder);
router.get('/', getOrders);  
router.put('/', updateOrders)

export default router;