const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cron = require("node-cron");
const config = require("./config");

const registrationRoute = require("./routes/registration.route");
const categoryRoute = require("./routes/category.route");
const subCategoryRoute = require("./routes/subCategory.route");
const productCategoryRoute = require("./routes/productCategory.route");
const productRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");
const orderRoute = require("./routes/order.route");
const rateRoute = require("./routes/rate.route");

const { OfferMail, OfferDead } = require("./controller/product.controller");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/img", express.static(path.join(__dirname, "assets/images")));
// app.use('/img',express.static(path.join(__dirname, 'assets/images/thumbnails')));

app.use("/api/user", registrationRoute);
app.use("/api/category", categoryRoute);
app.use("/api/subCategory", subCategoryRoute);
app.use("/api/productCategory", productCategoryRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/rate", rateRoute);

app.listen(config.port, () => {
  cron.schedule("10 00 * * *", () => {
    OfferMail(() => {
      console.log("running every minute to 1 from 5");
    });
  });
  cron.schedule("59 23 * * *", () => {
    OfferDead();
  });
  console.log("Server Started Listening");
});
