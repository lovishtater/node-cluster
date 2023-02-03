const mongoose = require("mongoose");

const product = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: Number,
  description: String,
  category: String,
  photo: {
    type: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Product", product);
