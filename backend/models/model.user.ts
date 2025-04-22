import * as mongoose from 'mongoose';
import { noteModel } from './model.note';
import { User } from '../types';

const userSchema = new mongoose.Schema<User>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  notes: [noteModel],
});


export const userModel = mongoose.model<User>('Users', userSchema);