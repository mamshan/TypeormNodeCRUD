import express from 'express';
import multer from 'multer';
import path from 'path';
 
import { myDataSource , myDataSource1 } from "../config/database.providers"
 

const router = express.Router();

router.get('/', getReportView);   



async function getReportView(req, res) {
     
    const queryRunner = myDataSource.createQueryRunner();
    const queryRunner1 = myDataSource1.createQueryRunner();
        try {
         
		const refno = req.query.ref;
		 
       
        const  purdetails =await queryRunner.manager.query(`SELECT refno,department,lcno,sdate FROM viewarn where lcno like '%${refno}%' group by refno,department,lcno,sdate`);

        const  gldebits =await queryRunner1.manager.query(`SELECT * FROM view_ledger where l_flag1='DEB'and L_LMEM like '%${refno}%' order by l_refno`);
 
        const  glcredits =await queryRunner1.manager.query(`SELECT * FROM view_ledger where l_flag1='CRE'and L_LMEM like '%${refno}%' order by l_refno`);
 
 
        const itemm = [];
        for (const result of purdetails) {


          const  puritems =await queryRunner.manager.query(`SELECT * FROM viewarn where refno = '${result.refno}'`);
          const items = [];
          var  shipqty =0;
          for (const result1 of puritems) {
          const item = {
            brand_name: result1.BRAND_NAME,
            size: result1.SIZE,
            stk_no: result1.STK_NO,
            qty: result1.REC_QTY,
          };
          shipqty = shipqty + result1.REC_QTY;

          items.push(item);
         }

         var dep = result.department;
         if (dep == "01") {
          dep = "KELANIYA";
         }
         if (dep == "18") {
          dep = "GONAWALA";
         }

          const itemmS = {
            refno: result.refno,
            department: dep,
            sdate: result.sdate,
            lcno: result.lcno,
            qty: shipqty,
            items: items,
            
          };

          itemm.push(itemmS);
        }



        res.json({
          purdetails:  itemm, 
		      gldebits:  gldebits, 
		      glcredits:  glcredits, 
         });

      } catch (error) {
          console.error('Error storing file data in MySQL:', error);
          res.status(500).send('Error storing file data in MySQL');
       }
  }
       




export default router;