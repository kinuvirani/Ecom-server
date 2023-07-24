const {Router} = require('express');
const router = Router();

const {addSubCategory,getSubCategory,updateSubCategory,updatesubCategoryStatus,deleteSubCategory,getSubCategoryById,getAllSubCategory}=require('../controller/subCategory.controller')

router.post('/save/:id',(req,res)=>{
    return addSubCategory(req.params.id, req.body,(err,result)=>{
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
    return getSubCategory((err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.get('/get/:id',(req,res)=>{
    return getSubCategoryById(req.params.id,(err,result)=>{
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
    return updateSubCategory(req.params.id,req.body,(err,result)=>{
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
    return deleteSubCategory(req.params.id,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.get('/get/sub/count',(req,res)=>{
    return getAllSubCategory((err,result)=>{
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
    return updatesubCategoryStatus(req.params.id,req.body,(err,result)=>{
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
