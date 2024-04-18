import { BoardGameDto } from '../dto/board-game.dto';
import BoardGame from '../models/board-game.model';
import { FilterType } from '../types/filter.type';
import { PaginationOptions, SortingOptions } from '../types/options.type';

export default class BoardGameRepository {
  static async findAll(
    paginationOptions: PaginationOptions,
    sortingOptions: SortingOptions
  ) {
    const { page, limit } = paginationOptions;
    const { field, order } = sortingOptions;

    const skip = (page - 1) * limit;

    const boardGames = await BoardGame.find()
      .sort({ [field]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return {
      data: boardGames,
      page,
      limit,
    };
  }

  static async findAllWithCount(
    paginationOptions: PaginationOptions,
    sortingOptions: SortingOptions
  ) {
    const { page, limit } = paginationOptions;

    const boardGames = await BoardGameRepository.findAll(
      paginationOptions,
      sortingOptions
    );

    const totalCount = await this.countAll();

    return { boardGames, totalCount };
  }

  static async countAll(): Promise<number> {
    const totalCount = await BoardGame.countDocuments();
    return totalCount;
  }

  static async create(data: BoardGameDto) {
    return await BoardGame.create(data);
  }

  static async findOne(filter: FilterType) {
    return await BoardGame.findOne(filter).lean();
  }

  static async findById(id: string) {
    return await BoardGame.findById(id);
  }

  static async update(id: string, data: BoardGameDto) {
    return await BoardGame.findById(id).updateOne(data);
  }

  static async delete(id: string) {
    return await BoardGame.findById(id).deleteOne();
  }
}
