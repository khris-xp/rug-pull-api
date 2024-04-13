import mongoose from 'mongoose';
import { PaymentType } from '../types/payment.type';
const { Schema } = mongoose;

const paymentSchema = new Schema<PaymentType>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model<PaymentType>('Payment', paymentSchema);

export default Payment;
