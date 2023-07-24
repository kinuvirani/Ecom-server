const {Router}=require('express')
const router=Router()
const {addToCart,getAllCartItems,checkItemInCart,deleteProduct,updateQty,updateStatus,getAllOrderDetail}=require('../controller/cart.controller')

router.post('/save',(req,res)=>{
    return addToCart(req.query.uid,req.query.pid,req.body,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})
router.get('/get/:uid',(req,res)=>{
    return getAllCartItems(req.params.uid,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.get('/get/:uid/:pid',(req,res)=>{
    return checkItemInCart(req.params.uid,req.params.pid,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.delete('/delete/:uid/:pid',(req,res)=>{
    return deleteProduct(req.params.uid,req.params.pid,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.put('/update/:id',(req,res)=>{
    return updateQty(req.params.id,req.body,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.put('/update/status/:uid',(req,res)=>{
    return updateStatus(req.params.uid,req.body,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.get('/get/order/detail/:uid',(req,res)=>{
    return getAllOrderDetail(req.params.uid,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

module.exports=router

