import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId, // Correction 1: .ObjectId add kiya
          ref: "Product",
          required: true,
        },
        quantity: {
          // Correction 2: quantity ko productId ke bahar nikala
          type: Number,
          required: true,
        },
      },
    ],
    amount: { type: Number, required: true },
    tax: { type: Number, required: true },
    shipping: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    // Razorpay Fields
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
