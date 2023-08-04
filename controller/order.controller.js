const {Order}=require('../sequelize')

exports.placeOrder=(uid,body,done)=>{
   let order=new Order(body)
    order.userId=uid
    order.save().then((doc)=>{
        done(null,doc)
    }).catch((err)=>{
        done(err,null)
    })
}
