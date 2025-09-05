import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["sale", "purchase"],
    },
    customerId: {
      // for sale
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
    vendorId: {
      // for purchase
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: Number,
        price: Number,
        _id: false, // to prevent mongoose from creating an _id for each product
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
