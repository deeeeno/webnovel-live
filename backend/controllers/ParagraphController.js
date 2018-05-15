const Paragraph = require("../models/Paragraph");
const debug = require("debug")("paragraphController");
const hasher = require("../util/hasher");

exports.saveParagraph = (content) => {
  return new Promise((resolve, reject) => {
    console.log("hi");
    const hash = hasher.hashSha(content);
    console.log(hash);
    console.log("bye");
    const freshParagraph = new Paragraph({
      hash,
      content,
    });

    freshParagraph.save().then((paragraph) => {
      resolve(paragraph);
    }).catch((err) => {
      debug(err);
      reject(err);
    });
  });
};

exports.findParagraph = (hash) => {
  return new Promise((resolve, reject) => {
    Paragraph.findOne({
      hash,
    }).exec().then((paragraph) => {
      if(paragraph == null) {
        resolve({});
      } else {
        resolve(paragraph);
      }
    }).catch((reason)=> {
      debug(`error in paragraph find one : ${reason}`);
      reject(reason);
    });
  });
};