import { Request, Response } from 'express';
import BookingRepository from '../repositories/booking.repository';
import PaymentRepository from '../repositories/payment.repository';
import { handleError } from '../utils/error.utils';
import {
  errorResponseStatus,
  successResponseStatus,
} from '../utils/response.utils';

const paymentController = {
  async findAll(req: Request, res: Response) {
    try {
      const payments = await PaymentRepository.findAll();
      return successResponseStatus(
        res,
        'Get all payments successfully.',
        payments
      );
    } catch (error) {
      return handleError(500, res, error);
    }
  },
  async create(req: Request, res: Response) {
    try {
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
      const { bookingId, total, status } = req.body;
      const user_id = String(req?.user?._id);
      const booking = await BookingRepository.findById(bookingId);
      if (!booking) {
        return errorResponseStatus(res, 'Booking not found', null, 400);
      }
      const data = { booking: bookingId, total, status, user: user_id };
      const payment = await PaymentRepository.create(data);
      const lineItems = {
        price_data: {
          currency: 'thb',
          booking_data: {
            id: booking.id,
          },
          unit_amount: booking.total_price,
        },
      };
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['promptpay'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `http://localhost:3000/payment/success`,
        cancel_url: `http://localhost:3000/payment/cancel`,
      });

      const paymentData = payment.toObject();

      return successResponseStatus(res, 'Create new payment successfully.', {
        paymentData,
        session,
      });
    } catch (error) {
      return handleError(500, res, error);
    }
  },
  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payment = await PaymentRepository.findById(id);
      if (!payment) {
        return errorResponseStatus(res, 'Payment not found.', null, 400);
      }
      return successResponseStatus(res, 'Get payment successfully.', payment);
    } catch (error) {
      return handleError(500, res, error);
    }
  },
};

export default paymentController;
