import asyncHandler from 'express-async-handler';
import { Clearnce } from '../entity/clearnceModel';
import { myDataSource } from "../config/database.providers"


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const register = asyncHandler(async (req, res) => {
    

    const {
      shipmentNo,
      cleanceDate,
      clearValue,
      loanDate,
      shipmentCleardt,
      remarks
          } = req.body;
  
   
        const bank= req.body.bank.code; 


    
  
    const userRepository = myDataSource.getRepository(Clearnce)
    const entryExists = await userRepository.findOne({ where:  { shipmentNo: shipmentNo }  })


    if (entryExists) {
      res.status(400);
      throw new Error('Entry already exists');
    }


    const entry = await userRepository.save({
      shipmentNo,
      cleanceDate,
      clearValue,
      loanDate,
      bank,
      shipmentCleardt,
      remarks 
    });
  

    

    if (entry) {
      
      res.status(201).json({
        entry: entry, 
      });
    } else {
      res.status(400);
      throw new Error('Invalid Data');
    }
});


// @desc    Get user profile
// @route   GET /api/orders/profile
// @access  Private
const getData = asyncHandler(async (req, res) => {


    const userRepository = myDataSource.getRepository(Clearnce)
  
  const entries = await userRepository.find({
    
    order: {
        shipmentCleardt: "DESC", 
    },
  });
    
    if (entries) {

      res.json({
        entries: entries
      });
    } else {
      res.status(404);
      throw new Error('Not found');
    }
  });
  

    const update = asyncHandler(async (req, res) => {
      
    
    const userRepository = myDataSource.getRepository(Clearnce)
    const entry = await userRepository.findOne({ where:  { id: req.body.id }  })

     

    if (entry) {


        const {
            shipmentNo,
            cleanceDate,
            clearValue,
            loanDate,
            shipmentCleardt,
            remarks
                } = req.body;
  
        const bank= req.body.bank.code; 

        const updatentry = await userRepository.update( { id: req.body.id },
            {
            shipmentNo,
            cleanceDate,
            clearValue,
            loanDate,
            shipmentCleardt,
            remarks,
            bank
            });

        
     
     


        const updatedentry = await userRepository.findOne({ where:  { id: req.body.id }  })
      res.json({
        id: updatedentry.id, 
      });
    } else {
      res.status(404);
      throw new Error('Not found');
    }
  });



  export {
    register,
    getData,
    update,
     
  };