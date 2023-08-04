const {Router} = require('express');
const router = Router();

const {addCategory,getCategory,updateCategory,deleteCategory,getAllCategory,updateCategoryStatus}=require('../controller/category.controller')

router.post('/save',(req,res)=>{
    return addCategory(req.body,(err,result)=>{
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
    return getCategory((err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.put('/edit/:id',(req,res)=>{
    return updateCategory(req.params.id,req.body,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.delete('/delete/:id',(req,res)=>{
    return deleteCategory(req.params.id,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.get('/get/category',(req,res)=>{
    return getAllCategory((err,result)=>{
        if(err){
            return res.status(400).send(err)
        }
        else
        {
            return res.status(200).send(result)
        }
    })
})

router.put('/update/status/:id',(req,res)=>{
    return updateCategoryStatus(req.params.id,req.body,(err,result)=>{
        if(err){
            return res.status(400).send(err)
        }
        else
        {
            return res.status(200).send(result)
        }
    })
})

module.exports = router;
