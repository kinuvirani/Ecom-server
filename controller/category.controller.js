const {Category}=require('../sequelize');

exports.addCategory=(body,done)=>{
    const category=new Category(body)
    category.save().then((doc)=>{
        done(null,doc)
    }).catch((err)=>{
        done(err,null)
    })
}

exports.getCategory=(done)=>{
    Category.findAll({where:{status:1}}).then((doc)=>{
        done(null,doc)
    }).catch((err)=>{
        done(err,null)
    })
}

exports.updateCategory=(id,body,done)=>{
    const category=new Category(body)
    category.categoryId=id;
    Category.update(category.dataValues,{where:{categoryId:id}}).then(()=>{
        done(null,category)
    }).catch((err)=>{
        done(err,null)
    })
}

// exports.deleteCategory=(id,done)=>{
//     Category.destroy({where:{categoryId:id}}).then((doc)=>{
//         done(null,doc)
//     }).catch((err)=>{
//         done(err,null)
//     })
// }

exports.getAllCategory=(done)=>{
    Category.findAndCountAll().then((res)=>{
        done(null,{'data':res.rows,'count':res.count})
    }).catch((err)=>{
        done(err,null)
    })
}

exports.updateCategoryStatus=(id,body,done)=>{
    let category=new Category(body)
    category.categoryId=id
    Category.update(category.dataValues,{where:{categoryId:id}}).then((doc)=>{
        Category.findAll({where:{categoryId:category.dataValues.categoryId}}).then((doc)=>{
            return done(null,doc)
        }).catch((err)=>{
            return done(err,null)
        })
    }).catch((err)=>{
        return done(err,null)
    })
}
