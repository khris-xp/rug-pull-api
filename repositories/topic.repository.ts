import { TopicDto } from '../dto/Topic.dto';
import Topic from '../models/topic.model';
import { FilterType } from '../types/filter.type';

export default class TopicRepository {
  static async findAll() {
    return await Topic.find().lean();
  }
  static async create(data: TopicDto) {
    return await Topic.create(data);
  }

  static async findOne(filter: FilterType) {
    return await Topic.findOne(filter).lean();
  }

  static async findById(id: string) {
    return await Topic.findById(id);
  }

  static async update(id: string, data: TopicDto) {
    return await Topic.findById(id).updateOne(data);
  }

  static async delete(id: string) {
    return await Topic.findById(id).deleteOne();
  }
}
