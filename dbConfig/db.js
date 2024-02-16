import mongoose from "mongoose";
export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    mongoose.connection.on("connection", () => {
      console.log("MongoDB Connected");
    });
  } catch (error) {}
}
