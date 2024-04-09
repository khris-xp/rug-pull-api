import mongoose from 'mongoose';

export type RoomType = {
  _id: mongoose.Types.ObjectId;
  name: string;
  capacity: number;
  status: string;
  tables: string[];
};
