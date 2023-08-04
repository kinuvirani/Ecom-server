const {Rate}=require('../sequelize')

const sequelize = require('sequelize');
const Op = sequelize.Op;

exports.rateProduct=(uid,pid,body,done)=>{
    let rate=new Rate(body)
    rate.userId=uid
    rate.productId=pid
    rate.save().then((doc)=>{
        done(null,doc)
    }).catch((err)=>{
        done(err,null)
    })
}

exports.getYourRating=(uid,pid,done)=>{
    Rate.findOne({where:{userId:uid,productId:pid}}).then((doc)=>{
        done(null,doc)
    }).catch((err)=>{
        done(err,null)
    })
}

exports.getTotalRating=(pid,done)=>{
    Rate.findAll({
            where:{productId:pid},
            attributes:['rating',[sequelize.fn('count', sequelize.col('rating')),'count']],
            group: ['rating']
        }).then((doc)=>{
        done(null,doc)
    }).catch((err)=>{
        done(err,null)
    })
}
exports.maxRating=(pid,done)=>{
    Rate.findAll({
        where:{productId:pid},
        attributes:[[sequelize.fn('max', sequelize.col('rating')),'max']]
    }).then((doc)=>{
        done(null,doc[0])
    }).catch((err)=>{
        done(err,null)
    })
}
