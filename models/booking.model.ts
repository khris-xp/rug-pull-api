import mongoose from 'mongoose';
import { BookingType } from '../types/booking.type';
const { Schema } = mongoose;

const bookingSchema = new Schema<BookingType>(
  {
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    board_game_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'BoardGame',
    },
    room_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Room' },
    table_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Table' },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    status: { type: String, required: true },
    duration: { type: Number, required: true },
    total_price: { type: Number, required: true },
    amount_player: { type: Number, required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model<BookingType>('Booking', bookingSchema);

export default Booking;
