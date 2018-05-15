const crypto = require("crypto");

exports.hashSha = (input) => {
  console.log("hello");
  const hasher = crypto.createHash("sha1");
  const inputString = JSON.stringify(input);
  hasher.update(inputString);
  return hasher.digest("hex");
}
