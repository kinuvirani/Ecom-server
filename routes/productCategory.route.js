const {Router} = require('express');
const router = Router();

const {addProductCategory,getProductCategory,getProductCategoryBySubId}=require('../controller/productCategory.controller')

router.post('/save/:cid/:sid',(req,res)=>{
    return addProductCategory(req.params.cid,req.params.sid, req.body,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.get('/get',(req,res)=>{
    return getProductCategory((err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.get('/get/:sid',(req,res)=>{
    return getProductCategoryBySubId(req.params.sid,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})
module.exports = router;
