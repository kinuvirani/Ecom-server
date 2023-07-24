const {Router} = require('express');
const router = Router();

const {addUser,userLogin,editUserProfile,getUserDetail,editUseraddress,editPassword,getUsers,updateUserStatus}=require('../controller/registration.controller')

router.post('/add',(req,res)=>{
    return addUser(req.body,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else{
            return res.status(200).send(result);
        }
    })
})

router.post('/login',(req,res)=>{
    return userLogin(req.body,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else{
            return res.status(200).send(result);
        }
    })
})

router.put('/edit/profile/:id',(req,res)=>{
    return editUserProfile(req.params.id,req.body,(err,result)=>{
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

router.put('/edit/address/:id',(req,res)=>{
    return editUseraddress(req.params.id,req.body,(err,result)=>{
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

router.put('/edit/password/:id',(req,res)=>{
    return editPassword(req.params.id,req.body,(err,result)=>{
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

router.get('/get/:id',(req,res)=>{
    return getUserDetail(req.params.id,(err,result)=>{
        if(err){
            return res.status(400).send(err);
        }
        else
        {
            return res.status(200).send(result);
        }
    })
})

router.get('/get/all/data',(req,res)=>{
    return getUsers((err,result)=>{
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
    return updateUserStatus(req.params.id,req.body,(err,result)=>{
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
