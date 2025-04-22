// const mongoose = require('mongoose')
import * as mongoose from 'mongoose'
import {Notes} from '../types';

export const noteModel = new mongoose.Schema<Notes>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  checked: { type: Boolean, required: true, default:false },
});


exports = noteModel;