const {Cart,Product}=require('../sequelize')

exports.addToCart=(uid,pid,body,done)=>{
    Cart.findAll({where:{userId:uid,productId:pid,isBought:0}}).then((doc)=>{
       if(doc.length>0)
        {
            return done("Already added to cart",null)
        }
        else
        {
            const cart=new Cart(body)
            cart.userId=uid
            cart.productId=pid
            cart.save().then((doc)=>{
                Cart.findOne({where:{productId:doc.dataValues.productId},include:[{model:Product}]}).then((data)=>{
                    done(null,data)
                    // done(err,null)
                })
            }).catch((err)=>{
                done(err,null)
            })
        }
    }).catch((err)=>{
        return done(err,null)
    })
}

exports.getAllCartItems=(uid,done)=>{
    Cart.findAndCountAll({where:{userId:uid,isBought:0},include:[{model:Product}]}).then((doc)=>{
        done(null,doc)
    }).catch((err)=>{
        done(err,null)
    })
}

exports.checkItemInCart=(uid,pid,done)=>{
    Cart.findAndCountAll({where:{userId:uid,productId:pid,isBought:0}}).then((doc)=>{
        done(null,{'count':doc.count})
    }).catch((err)=>{
        done(err,null)
    })
}

exports.deleteProduct=(uid,pid,done)=>{
    Cart.destroy({where:{userId:uid,productId:pid}}).then((doc)=>{
        done(null,"Product removed successfully")
    }).catch((err)=>{
        done(err,null)
    })
}

exports.updateQty=(id,body,done)=>{
    let cart=new Cart()
    cart.id=id
    cart.quantity=body.quantity
    Cart.update(cart.dataValues,{where:{id:id}}).then(()=>{
        Cart.findAll({where:{id:id}}).then((d)=>{
            done(null,d)
        }).catch((err)=>{
            done(err,null)
        })
    }).catch((err)=>{
        done(err,null)
    })
}

exports.updateStatus=(uid,body,done)=>{
    // let cart=new Cart()
    // cart.userId=uid
    // cart.isBought=1
    Cart.update({isBought:1},{where:{userId:uid,isBought:0}}).then((d)=>{
        done(null,d)
    }).catch((err)=>{
        done(err,null)
    })
}

exports.getAllOrderDetail=(uid,done)=>{
    Cart.findAll({where:{userId:uid,isBought:1},include:[{model:Product}]}).then((doc)=>{
        done(null,doc)
    }).catch((err)=>{
        done(err,null)
    })
}
