import mongoose from 'mongoose';
import { StatusType } from '../types/status.type';
const { Schema } = mongoose;

const statusSchema = new Schema<StatusType>(
  {
    name: { type: String, trim: true, max: 128, required: true },
    description: { type: String, trim: true, required: true },
    topics: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Status = mongoose.model<StatusType>('Status', statusSchema);

export default Status;
