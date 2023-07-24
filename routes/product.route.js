const {Router}=require('express')
const router=Router()
const {upload}=require('../uploadFile/fileUpload')

const {addProduct,getProductById,getProductByCategoryId,getProduct,getProductBykeyword,removeOffer,filterProduct,addOffer,updateProductStatus,updateQuantity,getSimilarProduct,recentProduct,getProductBySubcategoryId,getProductByPage,getProductByProductCategoryId,getAllProduct}=require('../controller/product.controller')

router.post('/save/:cid/:sid',upload.array('uploadfile', 12),(req,res)=>{
    return addProduct(req.params.cid,req.params.sid,req.body,req.files,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.get('/get/product/:id',(req,res)=>{
    return getProductById(req.params.id,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.get('/get/category/:id',(req,res)=>{
    return getProductByCategoryId(req.params.id,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.get('/get/subcategory/:id',(req,res)=>{
    return getProductBySubcategoryId(req.params.id,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.get('/get/productcategory/:id/:pageNo/:pageSize',(req,res)=>{
    return getProductByProductCategoryId(req.params.id,req.params.pageNo,req.params.pageSize,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.get('/get/all',(req,res)=>{
    return getAllProduct((err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.get('/get/:pageNo/:pageSize',(req,res)=>{
    return getProductByPage(req.params.pageNo,req.params.pageSize,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.get('/get/:pname/:pageNo/:pageSize',(req,res)=>{
    return getProductBykeyword(req.params.pname,req.params.pageNo,req.params.pageSize,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.put('/update/quantity/:pid/:qty',(req,res)=>{
    return updateQuantity(req.params.pid,req.params.qty,(err,result)=>{
        if(err)
        {
            return res.status(400).send(err)
        }
        else
        {
            return res.status(200).send(result)
        }
    })
})

router.get('/get/recent',(req,res)=>{
    return recentProduct((err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.get('/similar/product/:subCategoryId/:productId',(req,res)=>{
    return getSimilarProduct(req.params.subCategoryId,req.params.productId,(err,result)=>{
        if(err)
        {
            return res.status(400).send(err)
        }
        else
        {
            return res.status(200).send(result)
        }
    })
})

router.get('/get/products',(req,res)=>{
    return getProduct((err,result)=>{
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
    return updateProductStatus(req.params.id,req.body,(err,result)=>{
        if(err){
            return res.status(400).send(err)
        }
        else
        {
            return res.status(200).send(result)
        }
    })
})

router.get('/get/filter/product/:min/:max',(req,res)=>{
    return filterProduct(req.params.min,req.params.max,(err,result)=>{
        if(err){
            return res.status(400).send(err)
        }
        else{
            return res.status(200).send(result)
        }
    })
})

router.put('/add/offer/:id',(req,res)=>{
    return addOffer(req.params.id,req.body,(err,result)=>{
        if(err){
            return res.status(400).send(err)
        }
        else
        {
            return res.status(200).send(result)
        }
    })
})

router.put('/remove/offer/:id',(req,res)=>{
    return removeOffer(req.params.id,req.body,(err,result)=>{
        if(err){
            return res.status(400).send(err)
        }
        else
        {
            return res.status(200).send(result)
        }
    })
})

module.exports=router
