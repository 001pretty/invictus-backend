const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    products: [
      {
        products: { type: Array, required: true },
        totalPrice: { type: Number, required: true },
      },
    ],
    user: {
      information: {
        type: Object,
        required: true,
      },
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
