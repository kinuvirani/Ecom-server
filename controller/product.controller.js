const { Product, Cart, Registertion } = require("../sequelize");
var Jimp = require("jimp");
const path = require("path");
const { sendEmail } = require("../common/mail");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const moment = require("moment");

exports.addProduct = (cid, sid, body, file, done) => {
  let img = [];

  var imsgpath = path.join(__dirname, "../assets/images/");
  var thumbnailImagePath = path.join(__dirname, "../assets/images/thumbnails/");
  var homeImagePath = path.join(__dirname, "../assets/images/home/");

  file.map(async (data) => {
    Jimp.read(imsgpath + data.filename)
      .then(async (result) => {
        result
          .resize(100, 150)
          .quality(100)
          .write(homeImagePath + data.filename);

        result
          .resize(50, 70)
          .quality(100)
          .write(thumbnailImagePath + data.filename);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  for (var i in file) {
    img.push(file[i].filename);
  }
  const product = new Product();
  product.categoryId = cid;
  product.subCategoryId = sid;
  // product.productCategoryId=pcid;
  product.productName = body.productName;
  product.productBrand = body.productBrand;
  product.productPrice = body.productPrice;
  product.productDescription = body.productDescription;
  product.productImage = img.toString();
  product
    .save()
    .then((doc) => {
      done(null, { data: doc, File: file });
    })
    .catch((err) => {
      done(err, null);
    });
};

exports.getProductById = (id, done) => {
  Product.findAll({
    where: { productId: id, status: 1, quantity: { [Op.gt]: 0 } },
  })
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err, null);
    });
};

exports.getProductByCategoryId = (id, done) => {
  Product.findAll({
    where: { categoryId: id, status: 1, quantity: { [Op.gt]: 0 } },
  })
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err, null);
    });
};

exports.getProductBySubcategoryId = (id, done) => {
  Product.findAll({
    where: { subCategoryId: id, status: 1, quantity: { [Op.gt]: 0 } },
  })
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err, null);
    });
};

exports.getProductByProductCategoryId = (id, pageNo, pageSize, done) => {
  Product.findAndCountAll({ where: { productCategoryId: id, status: 1 } })
    .then((count) => {
      Product.findAll({
        where: { productCategoryId: id, status: 1 },
        offset: (pageNo - 1) * pageSize,
        limit: parseInt(pageSize),
      })
        .then((doc) => {
          done(null, { data: doc, count: count.count });
        })
        .catch((err) => {
          done(err, null);
        });
    })
    .catch((err) => {
      done(err, null);
    });
};

exports.getAllProduct = (done) => {
  Product.findAll({ where: { status: 1, quantity: { [Op.gt]: 0 } } })
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err, null);
    });
};

exports.getProductByPage = (pageNo, pageSize, done) => {
  Product.findAndCountAll({ where: { status: 1 }, quantity: { [Op.gt]: 0 } })
    .then((count) => {
      Product.findAll({
        where: { status: 1, quantity: { [Op.gt]: 0 } },
        offset: (pageNo - 1) * pageSize,
        limit: parseInt(pageSize),
      })
        .then((doc) => {
          done(null, { data: doc, count: count.count });
        })
        .catch((err) => {
          done(err, null);
        });
    })
    .catch((err) => {
      done(err, null);
    });
};

exports.getProductBykeyword = (pname, pageNo, pageSize, done) => {
  // let prname=pname.charAt(0).toLowerCase()
  Product.findAndCountAll({
    where: {
      status: 1,
      productName: { like: pname + "%" },
      quantity: { [Op.gt]: 0 },
    },
  })
    .then((count) => {
      Product.findAll({
        where: {
          status: 1,
          productName: { like: pname + "%" },
          quantity: { [Op.gt]: 0 },
        },
        offset: (pageNo - 1) * pageSize,
        limit: parseInt(pageSize),
      })
        .then((doc) => {
          done(null, { data: doc, count: count.count });
        })
        .catch((err) => {
          done(err, null);
        });
    })
    .catch((err) => {
      done(err, null);
    });
};

exports.updateQuantity = (pid, qty, done) => {
  Product.findOne({ where: { productId: pid } }).then((doc) => {
    let product = new Product();
    product.productId = pid;
    product.quantity = doc.dataValues.quantity - qty;
    Product.update(product.dataValues, { where: { productId: pid } })
      .then(() => {
        done(null, product);
      })
      .catch((err) => {
        done(err, null);
      });
  });
};

exports.recentProduct = (done) => {
  Product.findAll({
    where: { status: 1, quantity: { [Op.gt]: 0 } },
    limit: 6,
    order: [["updatedAt", "DESC"]],
  })
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err, null);
    });
};

exports.getSimilarProduct = (subCategoryId, productId, done) => {
  Product.findAll({
    where: {
      status: 1,
      subCategoryId: subCategoryId,
      productId: { [Op.not]: productId },
    },
  })
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err, null);
    });
};

exports.getProduct = (done) => {
  Product.findAndCountAll()
    .then((res) => {
      done(null, { data: res.rows, count: res.count });
    })
    .catch((err) => {
      done(err, null);
    });
};

exports.updateProductStatus = (id, body, done) => {
  let product = new Product(body);
  product.productId = id;
  Product.update(product.dataValues, { where: { productId: id } })
    .then((doc) => {
      Product.findAll({ where: { productId: id } })
        .then((doc) => {
          return done(null, doc);
        })
        .catch((err) => {
          return done(err, null);
        });
    })
    .catch((err) => {
      return done(err, null);
    });
};

exports.filterProduct = (min, max, done) => {
  let minP = parseInt(min);
  let maxP = parseInt(max);
  Product.findAll({ where: { productPrice: { [Op.between]: [minP, maxP] } } })
    .then((res) => {
      return done(null, res);
    })
    .catch((err) => {
      return done(err, null);
    });
};

exports.addOffer = (id, body, done) => {
  let so = [];
  let product = new Product(body);
  product.productId = id;
  Product.update(product.dataValues, { where: { productId: id } })
    .then(async () => {
      data = await Cart.findAll({
        where: { productId: id, isBought: 0 },
        attributes: ["userId"],
      }).then(async (user) => {
        let newUser = user.map((u) => {
          return u.dataValues;
        });
        return newUser;
      });
      Product.findAll({ where: { productId: id } }).then((data) => {
        return done(null, data);
      });
      // return done(null,data)

      data.forEach((d) => {
        Registertion.findOne({ where: { register_id: d.userId } }).then(
          async (emailId) => {
            if (emailId !== null) {
              var temp = `<font size="3"><p>Hello ${emailId.dataValues.firstname},<br/> Product offer has been announced that you added in your cart.</p>
                    <br/>click below link to know more details<br/>
                    <a href="http://localhost:3000/#home">http://localhost:3000/#home</a></font>`;

              var emailOptions = {
                to: emailId.dataValues.email,
                subject: `Flipkart Offer`,
                html: temp,
              };
              await sendEmail(emailOptions, done);
            }
          }
        );
      });
    })
    .catch((err) => {
      console.log("error=", err);
    });
};

exports.removeOffer = (id, body, done) => {
  let product = new Product(body);
  product.productId = id;
  Product.update(product.dataValues, { where: { productId: id } }).then(() => {
    Product.findAll({ where: { productId: id } })
      .then((doc) => {
        return done(null, doc);
      })
      .catch((err) => {
        return done(err, null);
      });
  });
};

exports.OfferMail = (done) => {
  Product.findAll({ where: { offer: { [Op.gt]: 0 } } }).then((doc) => {
    doc.map(async (sol) => {
      let pubDate = new Date(sol.dataValues.startDate);
      let date = pubDate.getDate();
      let month = pubDate.getMonth();
      let year = pubDate.getFullYear();
      let thisDate = [year, month, date];

      data = await Cart.findAll({
        where: { productId: sol.dataValues.productId },
      }).then((user) => {
        let newUser = user.map((u) => {
          return u.dataValues;
        });
        return newUser;
      });
      data.forEach((d) => {
        Registertion.findOne({ where: { register_id: d.userId } }).then(
          async (emailId) => {
            if (emailId !== null) {
              let currDate = new Date();
              let newdate = [
                currDate.getFullYear(),
                currDate.getMonth(),
                currDate.getDate(),
              ];

              if (moment(newdate).isSame(moment(thisDate))) {
                var temp = `<font size="3"><p>Hello ${emailId.dataValues.firstname} , <br/> A Offer is about to start on <strong>${sol.dataValues.productName}</strong> plz hurry up...
</p>
                </font>`;
                var emailOptions = {
                  to: emailId.dataValues.email,
                  subject: `shop Offer`,
                  html: temp,
                };
                await sendEmail(emailOptions, done);
              }
            }
          }
        );
      });
    });
  });
};

exports.OfferDead = () => {
  let date = Date();
  Product.findAll({ where: { offer: { [Op.gt]: 0 } } }).then((doc) => {
    let product = new Product();
    product.offer = 0;
    product.startDate = null;
    product.endDate = null;

    doc.map(async (sol) => {
      let pubDate = new Date(sol.dataValues.endDate);
      let date = pubDate.getDate();
      let month = pubDate.getMonth();
      let year = pubDate.getFullYear();
      let thisDate = [year, month, date];
      let currDate = new Date();
      let newdate = [
        currDate.getFullYear(),
        currDate.getMonth(),
        currDate.getDate(),
      ];
      if (moment(newdate).isSame(moment(thisDate))) {
        product.productId = sol.dataValues.productId;
        Product.update(
          {
            productId: sol.dataValues.productId,
            offer: 0,
            startDate: null,
            endDate: null,
          },
          { where: { productId: sol.dataValues.productId } }
        )
          .then((data) => {
            console.log("same", data);
          })
          .catch((err) => {
            console.log("Error", err);
          });
      }
    });
  });
};
