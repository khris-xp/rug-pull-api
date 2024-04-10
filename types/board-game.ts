import mongoose, { FlattenMaps, Types } from 'mongoose';

export type CommonBoardGameType = {
  page: number;
  limit: number;
  data: (FlattenMaps<BoardGameType> &
    Required<{
      _id: Types.ObjectId;
    }>)[];
};

export type BoardGameType = {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  players_min: number;
  players_max: number;
  duration: number;
  category: string;
  publisher: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
};
