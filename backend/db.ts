// const mongoose = require("mongoose");
import * as mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI!, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Error in connecting to database:", error);
    // process.exit(1);
  }
}

// exports = connectDB;
