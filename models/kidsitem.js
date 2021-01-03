const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kidsItemSchema = new Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    imageUrl2: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    sizefit: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("KidsItem", kidsItemSchema);
