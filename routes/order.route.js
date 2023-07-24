const {Router}=require('express')
const router=Router()

const {placeOrder}=require('../controller/order.controller')

router.post('/save/:uid',(req,res)=>{
    return placeOrder(req.params.uid,req.body,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else{
            return res.status(200).send(result);
        }
    })
})

module.exports=router
