import { Types, Document } from 'mongoose';

export type userToken = {
    uid:string,
    iat:string
}


export type Notes = {
//   _id?: Types.ObjectId;
  _id: string
  title: string;
  description: string;
  checked: boolean | string;
}

export interface User extends Document {
  email: string;
  password: string;
  notes: Types.DocumentArray<Notes>;
}
