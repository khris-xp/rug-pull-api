import { CategoryDto } from '../dto/category.dto';
import Category from '../models/category.model';
import { FilterType } from '../types/filter.type';

export default class CategoryRepository {
  static async findAll() {
    return await Category.find().lean();
  }
  static async create(data: CategoryDto) {
    return await Category.create(data);
  }

  static async findOne(filter: FilterType) {
    return await Category.findOne(filter).lean();
  }

  static async findById(id: string) {
    return await Category.findById(id);
  }

  static async update(id: string, data: CategoryDto) {
    return await Category.findById(id).updateOne(data);
  }

  static async delete(id: string) {
    return await Category.findById(id).deleteOne();
  }
}
