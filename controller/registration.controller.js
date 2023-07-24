const { Registertion } = require("../sequelize");
var passwordHash = require("password-hash");
var jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const config = require("../config");

exports.addUser = (body, done) => {
  Registertion.findAll({ where: { email: body.email } })
    .then((doc) => {
      if (doc.length > 0) {
        return done("This email is already exist", null);
      } else {
        let register = new Registertion(body);
        if (body.password === body.cpassword) {
          register["password"] = passwordHash.generate(body.password);
          register
            .save()
            .then((doc) => {
              return done(null, doc);
            })
            .catch((err) => {
              return done(err, null);
            });
        } else {
          return done("Confirm Password does not match", null);
        }
      }
    })
    .catch((err) => {
      return done(err, null);
    });
};

exports.userLogin = (body, done) => {
  Registertion.findOne({ where: { email: body.email, status: 1 } })
    .then((doc) => {
      let password = passwordHash.verify(
        body.password,
        doc.dataValues.password
      );
      if (password) {
        var token = jwt.sign(
          { email: body.email, password: body.password },
          config.jwt.secret_key
        );
        let doc1 = {
          register_id: doc.dataValues.register_id,
          email: doc.dataValues.email,
          role: doc.dataValues.role,
          token: token,
        };
        return done(null, doc1);
      } else {
        return done("Invalid Password", null);
      }
    })
    .catch((err) => {
      return done("Email does not exists", null);
    });
};

exports.editUserProfile = (id, body, done) => {
  let profile = new Registertion(body);
  Registertion.update(profile.dataValues, { where: { register_id: id } })
    .then((doc) => {
      return done(null, profile);
    })
    .catch((err) => {
      return done(err, null);
    });
};

exports.editUseraddress = (id, body, done) => {
  let profile = new Registertion(body);
  Registertion.update(profile.dataValues, { where: { register_id: id } })
    .then((doc) => {
      return done(null, profile);
    })
    .catch((err) => {
      return done(err, null);
    });
};

exports.editPassword = (id, body, done) => {
  Registertion.findOne({ where: { register_id: id } })
    .then((doc) => {
      let profile = new Registertion(body);
      let password = passwordHash.verify(
        body.oldPassword,
        doc.dataValues.password
      );
      if (password) {
        profile["password"] = passwordHash.generate(body.newPassword);
        Registertion.update(profile.dataValues, { where: { register_id: id } })
          .then((doc) => {
            return done(null, profile);
          })
          .catch((err) => {
            return done(err, null);
          });
      } else {
        return done("old password does not match", null);
      }
    })
    .catch((err) => {
      return done(err, null);
    });
};

exports.getUserDetail = (id, done) => {
  Registertion.findAll({ where: { register_id: id } })
    .then((doc) => {
      done(null, doc);
    })
    .catch((err) => {
      done(err, null);
    });
};

exports.getUsers = (done) => {
  Registertion.findAndCountAll({ where: { role: { [Op.not]: "Admin" } } })
    .then((res) => {
      // done(null,res)
      done(null, { data: res.rows, count: res.count });
    })
    .catch((err) => {
      done(err, null);
    });
};

exports.updateUserStatus = (id, body, done) => {
  let profile = new Registertion(body);
  Registertion.update(profile.dataValues, { where: { register_id: id } })
    .then((doc) => {
      Registertion.findAll({
        where: { register_id: profile.dataValues.register_id },
      })
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
