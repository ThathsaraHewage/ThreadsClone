import mongoose from "mongoose";

let isConnected = false;

export const DBconnection = async () => {
  mongoose.set("strictQuery", true);

  // if (!process.env.MONGO_URL_DEV) {
  //   return console.log("MONGODB URL IS MISSING !");
  // }

  if (isConnected) {
    console.log("MONGODB CONNECTION IS ALREADY ESTABLISHED !");
    return;
  }

  try {
    await mongoose.connect("mongodb://localhost:27017/verse");
    isConnected = true;
    console.log("MONGODB CONNECTED !");
  } catch (err) {
    console.log(err);
  }
};
