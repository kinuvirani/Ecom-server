const {ProductCategory}=require('../sequelize');

exports.addProductCategory=(cid,sid,body,done)=>{
    const productCategory=new ProductCategory(body)
    productCategory.categoryId=cid
    productCategory.subCategoryId=sid
    productCategory.save().then((doc)=>{
        done(null,doc)
    }).catch((err)=>{
        done(err,null)
    })
}

exports.getProductCategory=(done)=>{
    ProductCategory.findAll({limit: 10}).then((doc)=>{
        done(null,doc)
    }).catch((err)=>{
        done(err,null)
    })
}

exports.getProductCategoryBySubId=(id,done)=>{
    ProductCategory.findAll({where:{subCategoryId:id}}).then((doc)=>{
        done(null,doc)
    }).catch((err)=>{
        done(err,null)
    })
}
