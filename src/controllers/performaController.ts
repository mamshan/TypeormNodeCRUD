import asyncHandler from 'express-async-handler';
import { Performa,PerformaItems } from '../entity/Performa';
import { myDataSource } from "../config/database.providers"

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const register = asyncHandler(async (req, res) => {
    

    const {
        orderNo,
        piNo,
        piDate,
        value,
        rate,
        paymentRef,
        paymentDate,
        paymentValue,
        tolerance,
        loanApplied,
        loanGranted,
        usancePeriod,
        expiryDate,
        amendments,
        remarks,
        insuranceDate,
        debitNote,
        policy,
        insuracePaymentDt,
        insuraceCancellDt, performaItems } = req.body;
  
   
        const bank= req.body.bank.code;
        const currency= req.body.currency.code;
        const deliveryTerms= req.body.deliveryTerms.code;
        const paymentTerm = req.body.paymentTerm.code;


   
  
    const userRepository = myDataSource.getRepository(Performa)
    const entryExists = await userRepository.findOne({ where:  { piNo: piNo }  })


    if (entryExists) {
      res.status(400);
      throw new Error('Entry already exists');
    }
  
    const entry = await userRepository.save({
        orderNo,
        piNo,
        piDate,
        bank,
        currency,
        value,
        rate,
        deliveryTerms,
        paymentTerm,
        paymentRef,
        paymentDate,
        paymentValue,
        tolerance,
        loanApplied,
        loanGranted,
        usancePeriod,
        expiryDate,
        amendments,
        remarks,
        insuranceDate,
        debitNote,
        policy,
        insuracePaymentDt,
        insuraceCancellDt,
    });
  

    const performa = entry.id;
    const orderitemsls = performaItems.map((item) => ({  ...item, performa }));

    const userRepositoryitms = myDataSource.getRepository(PerformaItems)
    const orderls = await userRepositoryitms.save(
      orderitemsls
    );

   

    if (entry) {
      
      res.status(201).json({
        entry: entry,
        PerformaItems: orderls
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
     

    const userRepository = myDataSource.getRepository(Performa)
      
      const entries = await userRepository.find({
        relations: {
            PerformaItems: true,
        },
        order: {
            piDate: "DESC", 
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
   
    
    const userRepository = myDataSource.getRepository(Performa)
      const entry = await userRepository.findOne({ where:  { id: req.body.id }  })

    

    const {
      orderNo,
      piNo,
      piDate,
      value,
      rate,
      paymentRef,
      paymentDate,
      paymentValue,
      tolerance,
      loanApplied,
      loanGranted,
      usancePeriod,
      expiryDate,
      amendments,
      remarks,
      insuranceDate,
      debitNote,
      policy,
      insuracePaymentDt,
      insuraceCancellDt, performaItems } = req.body;

    if (entry) {

      const updatentry = await userRepository.update( { id: req.body.id },
        {
          orderNo,
          piNo,
          piDate,
          value,
          rate,
          paymentRef,
          paymentDate,
          paymentValue,
          tolerance,
          loanApplied,
          loanGranted,
          usancePeriod,
          expiryDate,
          amendments,
          remarks,
          insuranceDate,
          debitNote,
          policy,
          insuracePaymentDt,
          insuraceCancellDt
        }
        );

        
  
     
      const performa = entry.id;
      


      const itemsls = performaItems.map((item) => ({  ...item, performa }));
          
      const userRepositoryitms = myDataSource.getRepository(PerformaItems)
      const userToDelete = await userRepositoryitms.find({ where:  { performa: req.body.id }  })  
      await userRepositoryitms.delete({ performa: req.body.id });
      
      
      const entryls = await userRepositoryitms.save(
        itemsls
        );
      



      
      res.json({
        id: req.body.id
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