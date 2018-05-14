const express = require("express");
const router = express.Router();
const paragraphContreller = require("../controllers/ParagraphController");
const debug = require("debug")("api");

/* GET home page. */
router.get("/", function(req, res, next) {

});

router.get("/paragraph/:pHash", function(req, res, next) {
  paragraphContreller.findParagraph(req.params.pHash).then((paragraph, err)=> {
    res.json(paragraph);
  }).catch((err) => {
    //need error handling
    debug(`error in GET ${req.originalUrl}`);
  });
});

router.post("/paragraph", function(req, res, next) {
  console.log(req.body);
  paragraphContreller.saveParagraph(req.body.content).then((paragraph)=> {
    res.json(paragraph);
  }).catch((err) => {
    //need error handling
    debug(`error in GET ${req.originalUrl}`);
  });
});

module.exports = router;
