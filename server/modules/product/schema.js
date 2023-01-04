const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  img: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  des: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  quantitySold: {
    type: Number,
    required: true,
  },
});

module.exports = productSchema;
