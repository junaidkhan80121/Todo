import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB(){
  try {
    await mongoose.connect(process.env.MONGO_DB_URI!, {
      dbName: 'noteapp',
    });
    console.log("DB connected");


  } catch (error) {
    console.error("Error in connecting to database:", (error as Error).message);
  }
}
