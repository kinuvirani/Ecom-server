module.exports=(sequelize,type)=>{
    return sequelize.define('order',{
        orderId:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        userId:{
            type:type.UUID,
            allowNull:false
        },
        orderItem:type.STRING,
        total:type.INTEGER
    })
}
