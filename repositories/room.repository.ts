import { RoomDto } from '../dto/room.dto';
import Room from '../models/room.model';
import { FilterType } from '../types/filter.type';

export default class RoomRepository {
  static async findAll() {
    return await Room.find().lean();
  }
  static async create(data: RoomDto) {
    return await Room.create(data);
  }

  static async findOne(filter: FilterType) {
    return await Room.findOne(filter).lean();
  }

  static async findById(id: string) {
    return await Room.findById(id);
  }

  static async update(id: string, data: RoomDto) {
    return await Room.findById(id).updateOne(data);
  }

  static async delete(id: string) {
    return await Room.findById(id).deleteOne();
  }
}
