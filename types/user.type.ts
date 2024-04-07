import mongoose from 'mongoose';

export type UserType = {
  _id: mongoose.Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  pictureProfile: string;
  age: number;
  role: string;
  point: number;
  createdAt: string;
  updatedAt: string;
};