import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.dataBaseUrl);
    console.log("mongo connected");
  } catch (err) {
    console.error("mongodb connection error", err);
  }
};

export default connectDB;
