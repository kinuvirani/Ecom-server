const { Router } = require("express");
const router = Router();

const {
  rateProduct,
  getYourRating,
  getTotalRating,
  maxRating,
} = require("../controller/rate.controller");

router.post("/save/:uid/:pid", (req, res) => {
  return rateProduct(
    req.params.uid,
    req.params.pid,
    req.body,
    (err, result) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        return res.status(200).send(result);
      }
    }
  );
});

router.get("/get/:uid/:pid", (req, res) => {
  return getYourRating(req.params.uid, req.params.pid, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send(result);
    }
  });
});

router.get("/total/:pid", (req, res) => {
  return getTotalRating(req.params.pid, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send(result);
    }
  });
});

router.get("/max/:pid", (req, res) => {
  return maxRating(req.params.pid, (err, result) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send(result);
    }
  });
});

module.exports = router;
