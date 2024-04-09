import mongoose from 'mongoose';
import { RoomType } from '../types/room.type';
const { Schema } = mongoose;

const roomSchema = new Schema<RoomType>(
  {
    name: { type: String, trim: true, max: 128, required: true },
    capacity: { type: Number, required: true },
    status: { type: String, required: true },
    tables: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model<RoomType>('Room', roomSchema);

export default Room;
