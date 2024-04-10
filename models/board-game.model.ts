import mongoose from 'mongoose';
import { BoardGameType } from '../types/board-game';
const { Schema } = mongoose;

const boardGameSchema = new Schema<BoardGameType>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    players_min: { type: Number, required: true },
    players_max: { type: Number, required: true },
    duration: { type: Number, required: true },
    category: { type: String, required: true },
    publisher: { type: String, required: true },
    thumbnail: { type: String, required: true },
  },
  { timestamps: true }
);

const BoardGame = mongoose.model<BoardGameType>('BoardGame', boardGameSchema);

export default BoardGame;
