import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connect Succssfully ✅");
  } catch (error) {
    console.log("MongoDB Connection Error ❌");
  }
};

export default connectDB;
