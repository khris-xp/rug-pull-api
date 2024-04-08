import mongoose from 'mongoose';

export type StatusType = {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  topics: string;
};
