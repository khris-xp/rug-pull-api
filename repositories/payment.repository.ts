import { PaymentDto } from '../dto/payment.dto';
import Payment from '../models/payment.model';
import { FilterType } from '../types/filter.type';

export default class PaymentRepository {
  static async findAll() {
    return await Payment.find().lean();
  }
  static async create(data: PaymentDto) {
    return await Payment.create(data);
  }

  static async findOne(filter: FilterType) {
    return await Payment.findOne(filter).lean();
  }

  static async findById(id: string) {
    return await Payment.findById(id);
  }

  static async update(id: string, data: PaymentDto) {
    return await Payment.findById(id).updateOne(data);
  }

  static async delete(id: string) {
    return await Payment.findById(id).deleteOne();
  }
}
