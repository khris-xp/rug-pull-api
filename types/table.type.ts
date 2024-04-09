import mongoose from 'mongoose';

export type TableType = {
  _id: mongoose.Types.ObjectId;
  number: string;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
};
