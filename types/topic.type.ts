import mongoose from 'mongoose';

export type TopicType = {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
};