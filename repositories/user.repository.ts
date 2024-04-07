import { UserDto } from '../dto/user.dto';
import User from '../models/user.model';
import { FilterType } from '../types/filter.type';

export default class UserRepository {
  static async create(data: UserDto) {
    return await User.create(data);
  }

  static async findOne(filter: FilterType) {
    return await User.findOne(filter).lean();
  }

  static async findById(id: string) {
    return await User.findById(id).select('-password');
  }

  static async update(filter: FilterType, data: UserDto) {
    return await User.findOne(filter).updateOne(data);
  }

  static async delete(filter: FilterType) {
    return await User.findOne(filter).deleteOne();
  }

  static async find(filter: FilterType) {
    return await User.find(filter).lean();
  }
}
