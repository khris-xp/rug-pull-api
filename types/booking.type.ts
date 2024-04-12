import mongoose, { FlattenMaps, Schema } from 'mongoose';

export type CommonBookingType = {
  data: (FlattenMaps<BookingType> &
    Required<{
      _id: FlattenMaps<Schema.Types.ObjectId>;
    }>)[];
  page: number;
  limit: number;
};
export type BookingType = {
  _id: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  board_game_id: mongoose.Schema.Types.ObjectId;
  room_id: mongoose.Schema.Types.ObjectId;
  table_id: mongoose.Schema.Types.ObjectId;
  start_time: Date;
  end_time: Date;
  status: string;
  duration: number;
  total_price: number;
  amount_player: number;
  created_at: Date;
  updated_at: Date;
};
