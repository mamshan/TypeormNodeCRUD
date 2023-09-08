import asyncHandler from 'express-async-handler';
import { myDataSource } from "../config/database.providers"
 

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const getItems = asyncHandler(async (req, res) => {

    
    const queryRunner = myDataSource.createQueryRunner();
    var orders = await queryRunner.manager.query(
        `SELECT * FROM s_mas`
    );

    const items = [];
    for (const result of orders) {
      const item = {
        brand_name: {brand_name: result.BRAND_NAME},
        size: result.SIZE,
        stk_no: result.STK_NO,
      };
      items.push(item);
    }
  
    


    
    var brands = await queryRunner.manager.query(
        `SELECT brand_name FROM s_mas group by brand_name`
    );
    
    if (orders) {

      res.json({
       orders: items,
       brands: brands
      });
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  });



export {  
    getItems, 
  };