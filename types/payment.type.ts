import mongoose from 'mongoose';

export type PaymentType = {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  booking: mongoose.Types.ObjectId;
  total: number;
  status: string;
};
