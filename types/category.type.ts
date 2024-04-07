import mongoose from 'mongoose';

export type CategoryType = {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  topics: string;
};