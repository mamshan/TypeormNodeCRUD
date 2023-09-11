import asyncHandler from 'express-async-handler';
import {Shipment, ShipmentItems } from '../entity/shipmentModel';
import { myDataSource } from "../config/database.providers"


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const register = asyncHandler(async (req, res) => {
    

    const {
      piNo,
      shipmentNo,
      invoiceNo,
      invoiceDate, 
      invoiceValue, 
      blNo,
      blDate,
      maturityDate,
      arrivalDate, 
      bankDocumentDate,
      bankorgiginalDate,
      bankcancelledDate,
      bankexchangeRate,
      bankloanApplied,
      bankloanGranted,
      bankRemarks,
      freightDate,
      freightAgent,
      freightCharges,
      freightLocalCharges, 
      freightContainer,
      freightBlno,
      freightRefundable,
      freightFclDate,
      freightSendCollect,
      freightRefund,
      freightChequ,
      shipmentItems
     } = req.body;
  
   
     const freightPaidBy= req.body.freightPaidBy.code;
     const bankDocumentType= req.body.bankDocumentType.code;
 
    const userRepository = myDataSource.getRepository(Shipment)
    const entryExists = await userRepository.findOne({ where:  { shipmentNo: shipmentNo }  })


    if (entryExists) {
      res.status(400);
      throw new Error('Entry already exists');
    }

  
    const entry = await userRepository.save({
      piNo,
      shipmentNo,
      invoiceNo,
      invoiceDate, 
      invoiceValue, 
      blNo,
      blDate,
      maturityDate,
      arrivalDate,
      bankDocumentType,
      bankDocumentDate,
      bankorgiginalDate,
      bankcancelledDate,
      bankexchangeRate,
      bankloanApplied,
      bankloanGranted,
      bankRemarks,
      freightDate,
      freightAgent,
      freightCharges,
      freightLocalCharges,
      freightPaidBy,
      freightContainer,
      freightBlno,
      freightRefundable,
      freightFclDate,
      freightSendCollect,
      freightRefund,
      freightChequ, 
    });
  

    const shipment = entry.id;

     

     const orderitemsls = shipmentItems.map((item) => ({  ...item, shipment }));

    const userRepositoryitms = myDataSource.getRepository(ShipmentItems)
    const orderls = await userRepositoryitms.save(
      orderitemsls
    );

    

    if (entry) {
      
      res.json({
        entry: entry,
        ShipmentItems: orderitemsls
      });
    } else {
      res.status(400);
      throw new Error('Invalid Order data');
    }
});


// @desc    Get user profile
// @route   GET /api/orders/profile
// @access  Private
const getData = asyncHandler(async (req, res) => {
     

     const userRepository = myDataSource.getRepository(Shipment)
      
     const entries = await userRepository.find({
       relations: {
             ShipmentItems: true,
       },
       order: {
           invoiceDate: "DESC", 
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

 
    const userRepository = myDataSource.getRepository(Shipment)
    const entry = await userRepository.findOne({ where:  { id: req.body.id }  })


    const { piNo,
        shipmentNo,
        invoiceNo,
        invoiceDate, 
        invoiceValue, 
        blNo,
        blDate,
        maturityDate,
        arrivalDate, 
        bankDocumentDate,
        bankorgiginalDate,
        bankcancelledDate,
        bankexchangeRate,
        bankloanApplied,
        bankloanGranted,
        bankRemarks,
        freightDate,
        freightAgent,
        freightCharges,
        freightLocalCharges, 
        freightContainer,
        freightBlno,
        freightRefundable,
        freightFclDate,
        freightSendCollect,
        freightRefund,
        freightChequ,
        shipmentItems  } = req.body;

    
    if (entry) {

        const updatentry = await userRepository.update( { id: req.body.id },
            {
                shipmentNo,
                invoiceNo,
                invoiceDate, 
                invoiceValue, 
                blNo,
                blDate,
                maturityDate,
                arrivalDate, 
                bankDocumentDate,
                bankorgiginalDate,
                bankcancelledDate,
                bankexchangeRate,
                bankloanApplied,
                bankloanGranted,
                bankRemarks,
                freightDate,
                freightAgent,
                freightCharges,
                freightLocalCharges, 
                freightContainer,
                freightBlno,
                freightRefundable,
                freightFclDate,
                freightSendCollect,
                freightRefund,
                freightChequ,
            }
            );
    

      

      const shipment = entry.id;
     
      const itemsls = shipmentItems.map((item) => ({  ...item, shipment }));
          
      const userRepositoryitms = myDataSource.getRepository(ShipmentItems)
      const userToDelete = await userRepositoryitms.find({ where:  { shipment: req.body.id }  })  
      await userRepositoryitms.delete({ shipment: req.body.id });
      
      
      const entryls = await userRepositoryitms.save(
        itemsls
        );
        


      res.json({
        entry: entry,
        ShipmentItems: ShipmentItems
      });
    } else {
      res.status(404);
      throw new Error('Not found');
    }
  });

  export {
    register,
    getData,
    update
  };