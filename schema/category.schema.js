module.exports=(sequelize,type)=>{
    return sequelize.define('category',{
        categoryId:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        categoryName:type.STRING,
        status:{
            type:type.INTEGER,
            defaultValue:1
        }
    })
}
