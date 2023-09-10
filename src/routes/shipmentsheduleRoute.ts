import express from 'express';
import multer from 'multer';
import path from 'path';
import { myDataSource } from "../config/database.providers"
 
const router = express.Router();

router.get('/', getReportView);   



async function getReportView(req, res) {
     
   
    const queryRunner = myDataSource.createQueryRunner();
  
       
    
        try {
         
            const startDate = req.query.dtfrom;
            const endDate = req.query.dtto;

 
            if (req.query.reptype=="containerRefund") {
              const  entries =await queryRunner.manager.query(`SELECT * FROM shipments WHERE (freightRefund >= '${endDate}' or freightRefund is null or freightRefund='') and freightRefundable <>'NA' and freightRefundable>0`);
              res.json({
                entries:  entries, 
               });

            } 
            
            if (req.query.reptype=="shipmentshedule") {
              const  entries =await queryRunner.manager.query(`SELECT * FROM view_commer WHERE shipmentCleardt >= '${startDate}' AND shipmentCleardt <= '${endDate}'`);


              const items = [];
              for (const result of entries) {

               
                const  piqtyr =await queryRunner.manager.query(`SELECT sum(piqty) as qty from  performas as a ,  performa_items as b WHERE  a.id = b.performaId and a.piNo = '${result.piNo}' and b.code <> '' and b.description <> '' and b.piqty >0 `);

                var  piqty =0;
                for (const result1 of piqtyr) {
                  piqty = piqty + result1.qty;
                }
      
                const  qtyr =await queryRunner.manager.query(`SELECT sum(piqty) as qty from  shipment as a ,  shipment_items as b WHERE  a.id = b.shipmentId and a.shipmentNo = '${result.shipmentNo}' and b.code <> '' and b.description <> '' and b.piqty >0 `);

                var  ciqty =0;
                for (const result1 of qtyr) {
                  ciqty = ciqty + result1.qty;
                }


                const item = {
                  piDate: result.piDate,
                  orderNo: result.orderNo,
                  piNo: result.piNo,
                  piQty:piqty,
                  value: result.value,
                  paymentTerm: result.paymentTerm,
                  deliveryTerms: result.deliveryTerms,
                  bank: result.bank,
                  paymentRef: result.paymentRef,
                  invoiceNo: result.invoiceNo,
                  invoiceDate: result.invoiceDate,
                  ciqty:ciqty,
                  buyer: result.buyer,
                  invoiceValue: result.invoiceValue,
                  freightCharges: result.freightCharges, 
                };
                items.push(item);
              }
                  
              res.json({
                entries:  items, 
               });
            }


            if (req.query.reptype=="orderana") {

              const  order =await queryRunner.manager.query(`SELECT * from Orders where id  = '${req.query.ordno}'  `);

              const orddt = order[0].orderDate;
              

              const today = new Date(orddt);

              const lastMonth = subtractMonths(today, 6);
              const lastMonth1 = lastMonth;
             
              const items = [];
              const  qtyr =await queryRunner.manager.query(`SELECT * from order_items where orderID  = '${req.query.ordno}'  `);

              var  ciqty =0;
              for (const result1 of qtyr) {

                console.log(lastMonth1);
                
                ciqty = ciqty + result1.qty;

                const monthitems = [];
                var currentMonth = lastMonth;
                var i = 0;
                var totsal = 0;





                const  qtypsum =await queryRunner.manager.query(`SELECT sum(tru_qty) as qty from s_trn where stk_no  = '${result1.code}' and sdate <='${orddt}'`);
                var  stkqty =0;
                for (const resultpur of qtypsum) {
                  stkqty = stkqty + resultpur.qty;
                }

                while (currentMonth < today) {


                      const  qtypsum =await queryRunner.manager.query(`SELECT sum(qty) as qty from s_trn where stk_no  = '${result1.code}' and month(sdate) ='${currentMonth.getMonth()+1}' and year(sdate)='${currentMonth.getFullYear()}'  and ledindi ='ARN' `);
                      var  purqty =0;
                      for (const resultpur of qtypsum) {
                        purqty = purqty + resultpur.qty;
                      }

                      const  qtysalsum =await queryRunner.manager.query(`SELECT sum(qty) as qty  from s_trn where stk_no  = '${result1.code}' and month(sdate) ='${currentMonth.getMonth()+1}' and year(sdate)='${currentMonth.getFullYear()}'  and ledindi ='INV' `);
                      var  salqty =0;
                      for (const resultpur of qtysalsum) {
                        salqty = salqty + resultpur.qty;
                      }
                      const  qtyretsum =await queryRunner.manager.query(`SELECT sum(qty) as qty  from s_trn where stk_no  = '${result1.code}' and month(sdate) ='${currentMonth.getMonth()+1}' and year(sdate)='${currentMonth.getFullYear()}'  and ledindi ='GRN' `);
                      for (const resultpur of qtyretsum) {
                        salqty = salqty - resultpur.qty;
                      }




                      const monthitem = {
                        pur: purqty,
                        sal: salqty,
                        date: (currentMonth.getMonth()+1), 
                      }
                      monthitems.push(monthitem);
                      totsal = totsal + salqty

                      currentMonth =  addMonths(currentMonth, 1);
                      var i = i + 1;
                }


                const item = {
                  stk_no: result1.code, 
                  size: result1.description, 
                  qty: result1.qty, 
                  avg: totsal/i, 
                  stkqty: stkqty,
                  monthitems: monthitems,
                  lastMonth: lastMonth,
                  totqty: (stkqty+result1.qty),
                  nexmon: (totsal/i)*3,
                  bal: (result1.qty+stkqty)-(totsal/i)*3,
                }
                items.push(item);


              }



              res.json({
                entries:  items, 
               });

            }


           
            if (req.query.reptype == "freight") {
              const entries = await queryRunner.manager.query(`SELECT * FROM shipments WHERE freightDate >= '${startDate}' AND freightDate <= '${endDate}'`);
        
              res.json({
                entries: entries,
              });
        
            }
       

      } catch (error) {
          console.error('Error storing file data in MySQL:', error);
          res.status(500).send('Error storing file data in MySQL');
       }
  }

  function subtractMonths(date, months) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - months);
    return newDate;
  }
  function addMonths(date, months) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }
  
       




export default router;