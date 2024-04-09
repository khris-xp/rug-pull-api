import { TableDto } from '../dto/table.dto';
import Table from '../models/tabel.model';
import { FilterType } from '../types/filter.type';

export default class TableRepository {
  static async findAll() {
    return await Table.find().lean();
  }
  static async create(data: TableDto) {
    return await Table.create(data);
  }

  static async findOne(filter: FilterType) {
    return await Table.findOne(filter).lean();
  }

  static async findById(id: string) {
    return await Table.findById(id);
  }

  static async update(id: string, data: TableDto) {
    return await Table.findById(id).updateOne(data);
  }

  static async delete(id: string) {
    return await Table.findById(id).deleteOne();
  }
}
