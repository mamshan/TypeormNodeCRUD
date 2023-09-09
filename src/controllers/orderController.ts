import asyncHandler from 'express-async-handler';
import { Order,OrderItems } from '../entity/Orders';
import { myDataSource } from "../config/database.providers"
import { Request, Response,  } from 'express';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerOrder = asyncHandler(async (req, res) => {
    

    const { orderNo, orderDate,  orderItems } = req.body;
  
    const supplier = req.body.supplier.code;
    const buyer = req.body.buyer.code;

     
    const userRepository = myDataSource.getRepository(Order)
    const orderExists = await userRepository.findOne({ where:  { orderNo: orderNo }  })

    if (orderExists) {
      res.status(400);
      throw new Error('Order already exists');
    }
  
    const order = await userRepository.save({
      orderNo,
      orderDate,
      supplier,
      buyer 
    });
  

    const orderId = order.id;
    
     // Delete existing order items
    // await OrderItems.destroy({
    //  where: { orderId: orderId },
    //});

     // Create/update order items
    // await OrderItems.bulkCreate(orderItems.map((item) => ({ ...item, orderId })), { validate: true });

    const orderitemsls = orderItems.map((item) => ({  ...item, orderId }));

    console.log(orderitemsls);

    const userRepositoryitms = myDataSource.getRepository(OrderItems)

    const orderls = await userRepositoryitms.save(
        orderitemsls
      );
 
  

    if (order) {
      
      res.status(201).json({
        entry: order,
        OrderItems: orderitemsls
      });
    } else {
      res.status(400);
      throw new Error('Invalid Order data');
    }
});


// @desc    Get user profile
// @route   GET /api/orders/profile
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
    


   const userRepository = myDataSource.getRepository(Order)

   const orders = await userRepository.find({
     relations: {
        OrderItems: true,
     },
     order: {
        orderDate: "DESC", 
     },
     });
 
    
    if (orders) {

      res.json({
       orders: orders
      });
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  });
  

  const updateOrders = asyncHandler(async (req, res) => {
     
    const userRepository = myDataSource.getRepository(Order)
    const order = await userRepository.findOne({ where:  { id: req.body.id }  })


    const { orderNo, orderDate, orderItems } = req.body;

    const supplier = req.body.supplier.code;
    const buyer = req.body.buyer.code;

    if (order) {
      
      // Update the order
      const updatedorder = await userRepository.update( { id: req.body.id },
      {
        orderNo,
        orderDate,
        supplier,
        buyer,
      }
    );

  

   
      const orderId = order.id;
    
      // Delete existing order items
     // await OrderItems.destroy({
      // where: { orderId: orderId },
     //});
 
      // Create/update order items
    //  await OrderItems.bulkCreate(orderItems.map((item) => ({ ...item, orderId })), { validate: true });
 
    const orderitemsls = orderItems.map((item) => ({  ...item, orderId }));

    const userRepositoryitms = myDataSource.getRepository(OrderItems)
    const userToDelete = await userRepositoryitms.find({ where:  { orderId: req.body.id }  })  
    await userRepositoryitms.delete({ orderId: req.body.id });


    const orderls = await userRepositoryitms.save(
        orderitemsls
      );

      res.json({
        _id: order.id,
        supplier: order.supplier,
        buyer: order.buyer,
      });
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  });

  export {
    registerOrder,
    getOrders,
    updateOrders
  };