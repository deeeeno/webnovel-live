const express = require("express");
const router = express.Router();
const debug = require("debug")("api");

const paragraphController = require("../controllers/ParagraphController");
const docSnapshotController = require("../controllers/DocSnapshotController");
const documentController = require("../controllers/DocumentController");

/* GET home page. */
router.get("/", function(req, res, next) {

});

router.get("/paragraph/:pHash", function(req, res, next) {
  paragraphController.findParagraph(req.params.pHash).then((paragraph, err)=> {
    res.json(paragraph);
  }).catch((err) => {
    //need error handling
    debug(`error in GET ${req.originalUrl}`);
  });
});

router.post("/paragraph", function(req, res, next) {
  paragraphController.saveParagraph(req.body.content).then((paragraph)=> {
    res.json(paragraph);
  }).catch((err) => {
    //need error handling
    debug(`error in GET ${req.originalUrl}`);
  });
});

router.get("/docsnapshot/:snapHash", function(req, res, next) {
  docSnapshotController.findDocSnapshot(req.params.snapHash).then((snapshot, err)=> {
    res.json(snapshot);
  }).catch((err) => {
    //need error handling
    debug(`error in GET ${req.originalUrl}`);
  });
});

router.post("/docsnapshot", function(req, res, next) {
  docSnapshotController.saveDocSnapshot(req.body.paragraphs).then((paragraph)=> {
    res.json(paragraph);
  }).catch((err) => {
    //need error handling
    debug(`error in GET ${req.originalUrl}`);
  });
});

router.get("/document/name/:dName", function(req, res, next) {
  documentController.findDocumentWithName(req.params.dName).then((snapshot, err)=> {
    res.json(snapshot);
  }).catch((err) => {
    //need error handling
    debug(`error in GET ${req.originalUrl}`);
  });
});

router.post("/document", function(req, res, next) {
  documentController.createDocument(req.body.name).then((paragraph)=> {
    res.json(paragraph);
  }).catch((err) => {
    //need error handling
    debug(`error in GET ${req.originalUrl}`);
  });
});


module.exports = router;
