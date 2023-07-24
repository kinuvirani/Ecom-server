const Sequelize = require("sequelize");

const registerModel = require("./schema/registration.schema");
const categoryModel = require("./schema/category.schema");
const subCategoryModel = require("./schema/subCategory.schema");
const productCategoryModel = require("./schema/productCategory.schema");
const productModel = require("./schema/product.schema");
const cartModel = require("./schema/cart.schema");
const orderModel = require("./schema/order.schema");
const rateModel = require("./schema/rate.schema");
const config = require("./config");

const Op = Sequelize.Op;
const sequelize = new Sequelize({
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  host: config.db.host,
  port: config.db.port,
  operatorsAliases: Op,
  dialect: "mysql",
  logging: false,
});

const Registertion = registerModel(sequelize, Sequelize);
const Category = categoryModel(sequelize, Sequelize);
const SubCategory = subCategoryModel(sequelize, Sequelize);
const ProductCategory = productCategoryModel(sequelize, Sequelize);
const Product = productModel(sequelize, Sequelize);
const Cart = cartModel(sequelize, Sequelize);
const Order = orderModel(sequelize, Sequelize);
const Rate = rateModel(sequelize, Sequelize);

SubCategory.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(SubCategory, { foreignKey: "categoryId" });

Product.belongsTo(Category, { foreignKey: "productCategoryId" });
Category.hasMany(Product, { foreignKey: "productCategoryId" });

ProductCategory.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(ProductCategory, { foreignKey: "categoryId" });
ProductCategory.belongsTo(SubCategory, { foreignKey: "subCategoryId" });
SubCategory.hasMany(ProductCategory, { foreignKey: "subCategoryId" });

Product.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(SubCategory, { foreignKey: "subCategoryId" });
SubCategory.hasMany(Product, { foreignKey: "subCategoryId" });
Product.belongsTo(ProductCategory, { foreignKey: "productCategoryId" });
ProductCategory.hasMany(Product, { foreignKey: "productCategoryId" });

Cart.belongsTo(Registertion, { foreignKey: "userId" });
Cart.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(Cart, { foreignKey: "productId" });

Rate.belongsTo(Registertion, { foreignKey: "userId" });
Registertion.hasMany(Rate, { foreignKey: "userId" });
Rate.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(Rate, { foreignKey: "productId" });

Order.belongsTo(Registertion, { foreignKey: "userId" });

sequelize.sync().then(() => {
  console.log(`Users db and user table have been created`);
});

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

module.exports = {
  Registertion,
  Category,
  SubCategory,
  ProductCategory,
  Product,
  Cart,
  Order,
  Rate,
};
