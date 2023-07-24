require("dotenv").config();

const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  db: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    name: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
  },
  jwt: {
    secret_key: process.env.JWT_SECRET,
    expiresIn: "1h",
  },
};

module.exports = config;
