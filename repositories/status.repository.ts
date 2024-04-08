import { StatusDto } from '../dto/status.dto';
import Status from '../models/status.model';
import { FilterType } from '../types/filter.type';

export default class StatusRepository {
  static async findAll() {
    return await Status.find().lean();
  }
  static async create(data: StatusDto) {
    return await Status.create(data);
  }

  static async findOne(filter: FilterType) {
    return await Status.findOne(filter).lean();
  }

  static async findById(id: string) {
    return await Status.findById(id);
  }

  static async update(id: string, data: StatusDto) {
    return await Status.findById(id).updateOne(data);
  }

  static async delete(id: string) {
    return await Status.findById(id).deleteOne();
  }
}