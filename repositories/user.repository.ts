import User from '../models/user.model';
import { UpdateUserType, UserType } from '../types/user.type';

export default class UserRepository {
  static async create(data: UserType) {
    return await User.create(data);
  }

  static async findOne(filter: any) {
    return await User.findOne(filter).lean();
  }

  static async findById(id: string) {
    const user = await User.findById(id).select('-password');
    if (!user) throw new Error('User does not exist.');
    return user;
  }

  static async update(filter: any, data: UpdateUserType) {
    return await User.findOne(filter).updateOne(data);
  }

  static async delete(filter: any) {
    return await User.findOne(filter).deleteOne();
  }

  static async find(filter: any) {
    return await User.find(filter).lean();
  }
}
