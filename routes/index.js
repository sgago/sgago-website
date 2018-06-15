const copyrightYear = new Date().getFullYear();

var express = require('express');
var router = express.Router();

/* GET home page */
router.get("/", function(req, res, next) {
  res.render("index",
    { title: "Software Developer",
      copyrightYear: copyrightYear});
});

/* GET cookies page */
router.get("/cookies", function(req, res, next) {
  res.render("cookies", { title: "Cookie Policy" });
});


module.exports = router;
