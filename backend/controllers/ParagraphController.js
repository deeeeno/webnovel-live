const Paragraph = require("../models/Paragraph");
const debug = require("debug")("paragraphController");
const crypto = require("crypto");

exports.saveParagraph = (content) => {
  return new Promise((resolve, reject) => {
    const hasher = crypto.createHash("sha1");
    hasher.update(content);
    const hash = hasher.digest("hex");
    const freshParagraph = new Paragraph({
      hash,
      content,
    });

    freshParagraph.save().then((p) => {
      resolve(p);
    }).catch((err) => {
      debug(err);
      reject(err);
    });
  });
}

exports.findParagraph = (hash) => {
  return new Promise((resolve, reject) => {
    Paragraph.findOne({
      hash,
    }).exec().then((p) => {
      if(p == null) {
        resolve({});
      } else {
        resolve(p);
      }
    }).catch((reason)=> {
      debug(`error in paragraph find one : ${reason}`);
      reject(reason);
    });
  });
}