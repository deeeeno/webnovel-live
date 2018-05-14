const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ParagraphSchema = new Schema({
  hash: String,
  content: String,
}, { timestamps: true });
// timestamps add createdAt and updatedAt

ParagraphSchema
.virtual("url")
.get(function () {
  //return `/api/paragraph/${this.id}`;
});

module.exports = mongoose.model("Paragraph", ParagraphSchema);