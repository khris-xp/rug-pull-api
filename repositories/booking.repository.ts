import { BookingDto } from '../dto/booking.dto';
import Booking from '../models/booking.model';
import { FilterType } from '../types/filter.type';
import { PaginationOptions, SortingOptions } from '../types/options.type';

export default class BookingRepository {
  static async findAll(
    paginationOptions: PaginationOptions,
    sortingOptions: SortingOptions
  ) {
    const { page, limit } = paginationOptions;
    const { field, order } = sortingOptions;

    const skip = (page - 1) * limit;

    const bookings = await Booking.find()
      .sort({ [field]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return {
      data: bookings,
      page,
      limit,
    };
  }

  static async create(data: BookingDto) {
    return await Booking.create(data);
  }

  static async findOne(filter: FilterType) {
    return await Booking.findOne(filter).lean();
  }

  static async findById(id: string) {
    return await Booking.findById(id);
  }

  static async update(id: string, data: BookingDto) {
    return await Booking.findById(id).updateOne(data);
  }

  static async delete(id: string) {
    return await Booking.findById(id).deleteOne();
  }
}
