const {SubCategory,Category}=require('../sequelize');

exports.addSubCategory=(id,body,done)=>{
    const category=new SubCategory(body)
    category.categoryId=id
    category.save().then((doc)=>{
        // done(null,doc)
        SubCategory.findAll({where:{subCategoryId:doc.dataValues.subCategoryId},include:[{model:Category}]}).then((d)=>{
            done(null,d)
        }).catch((err)=>{
            done(err,null)
        })
    }).catch((err)=>{
        done(err,null)
    })
}

exports.getSubCategory=(done)=>{
    SubCategory.findAll({include:[{model:Category,attributes:['categoryName','categoryId']}]}).then((doc)=>{
        done(null,doc)
    }).catch((err)=>{
        done(err,null)
    })
}

exports.getSubCategoryById=(id,done)=>{
    SubCategory.findAll({where:{categoryId:id}}).then((doc)=>{
        done(null,doc)
    }).catch((err)=>{
        done(err,null)
    })
}

exports.updateSubCategory=(id,body,done)=>{
    const category=new SubCategory(body)
    category.subCategoryId=id;
    SubCategory.update(category.dataValues,{where:{subCategoryId:id}}).then(()=>{
        SubCategory.findAll({where:{subCategoryId:id},include:[{model:Category,attributes:['categoryName','categoryId']}]}).then((doc)=>{
            return done(null,doc)
        }).catch((err)=>{
            return done(err,null)
        })
    }).catch((err)=>{
        done(err,null)
    })
}

exports.deleteSubCategory=(id,done)=>{
    SubCategory.destroy({where:{subCategoryId:id}}).then((doc)=>{
        done(null,doc)
    }).catch((err)=>{
        done(err,null)
    })
}

exports.getAllSubCategory=(done)=>{
    SubCategory.findAndCountAll({include:[{model:Category,attributes:['categoryName','categoryId']}]}).then((res)=>{
        done(null,{'data':res.rows,'count':res.count})
    }).catch((err)=>{
        done(err,null)
    })
}

exports.updatesubCategoryStatus=(id,body,done)=>{
    let scategory=new SubCategory(body)
    scategory.subCategoryId=id
    SubCategory.update(scategory.dataValues,{where:{subCategoryId:id}}).then((doc)=>{
        SubCategory.findAll({where:{subCategoryId:id},include:[{model:Category,attributes:['categoryName','categoryId']}]}).then((doc)=>{
            return done(null,doc)
        }).catch((err)=>{
            return done(err,null)
        })
    }).catch((err)=>{
        return done(err,null)
    })
}
