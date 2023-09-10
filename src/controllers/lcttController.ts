import asyncHandler from 'express-async-handler';
import {lc_tr } from '../entity/lcttModel';
import { myDataSource } from '../config/database.providers';


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const register = asyncHandler(async (req, res) => {
    



    const {
        lc_tr_no,
        sdate,
        cur,
        rate, 
        amount, 
        lkr_val,
        lo_due_date,
        exp_date,
        exp_date2,
        our_ref,
        supp, 
     } = req.body;
   
    const code = req.body.bank.code;

     


    const flag = "LC";
    const sdate1 = sdate;


 

    const userRepository = myDataSource.getRepository(lc_tr)
    const entryExists = await userRepository.findOne({ where:  { lc_tr_no: lc_tr_no }  })


    if (entryExists) {
      res.status(400);
      throw new Error('Entry already exists');
    }
  
    const entry = await userRepository.save({
        lc_tr_no,
        sdate,
        sdate1,
        cur,
        rate, 
        amount, 
        lkr_val,
        lo_due_date,
        exp_date,
        exp_date2,
        our_ref,
        supp, 
        code,
        flag
    });
  

  

    if (entry) {
      
      res.json({
        entry: entry, 
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

    const flag = "LC";

 
    const userRepository = myDataSource.getRepository(lc_tr)
      
      const entries = await userRepository.find({
        where: { flag: flag ,},
        order: {
            sdate: "DESC", 
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
  
  const getLcno = asyncHandler(async (req, res) => {
    const refNo = req.params.refNo;

 
  
    const userRepository = myDataSource.getRepository(lc_tr)
    const entry = await userRepository.findOne({ where:  { lc_tr_no: refNo }  })


    if (entry) {
      res.json({
        entry: entry
      });
    } else {
      res.status(404);
      throw new Error('Not found');
    }

  });

  const update = asyncHandler(async (req, res) => {
   
   
    
    const userRepository = myDataSource.getRepository(lc_tr)
    const entry = await userRepository.findOne({ where:  { id: req.body.id }  })

    const {
      lc_tr_no,
      sdate,
      cur,
      rate, 
      amount, 
      lkr_val,
      lo_due_date,
      exp_date,
      exp_date2,
      our_ref,
      supp, 
   } = req.body;
 
  const code = req.body.bank.code;

  const flag = "LC";
  const sdate1 = sdate;

  

    if (entry) {

      const updatentry = await userRepository.update( { id: req.body.id },
        {
          lc_tr_no,
          sdate,
          sdate1,
          cur,
          rate, 
          amount, 
          lkr_val,
          lo_due_date,
          exp_date,
          exp_date2,
          our_ref,
          supp, 
          code,
          flag
        }
        );

 

      const updatedentry = await userRepository.findOne({ where:  { id: req.body.id }  })

      res.json({
        entry: updatedentry, 
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
    getLcno
  };