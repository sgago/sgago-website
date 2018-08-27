const copyrightYear = new Date().getFullYear();

var express = require('express');
var router = express.Router();

/* GET welcome page */
router.get("/welcome", function(req, res, next) {
  res.render("welcome",
    { copyrightYear: copyrightYear });
});

/* GET slfy-data page */
router.get("/slfy-data", function(req, res, next) {
  res.render("slfy-data",
    {  });
});

/* GET home page */
router.get("/", function(req, res, next) {
  res.render("index",
    { title: "Software Developer",
      copyrightYear: copyrightYear });
});

/* GET Slfy Demo page */
router.get("/slfy", function(req, res, next) {
  res.render("slfy",
    { title: "Slfy JS",
      copyrightYear: copyrightYear });
});

/* GET cookies page */
router.get("/cookies", function(req, res, next) {
  res.render("cookies", { title: "Cookie Policy" });
});

module.exports = router;
