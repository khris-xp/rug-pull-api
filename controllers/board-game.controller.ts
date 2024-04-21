import { Request, Response } from 'express';
import BoardGameRepository from '../repositories/board-game.repository';
import { PaginationOptions, SortingOptions } from '../types/options.type';
import { handleError } from '../utils/error.utils';
import { successResponseStatus } from '../utils/response.utils';

const boardGameController = {
  async findAll(req: Request, res: Response) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'name',
        sortOrder = 'asc',
      } = req.query;

      const pageNumber: number = +page;
      const limitNumber: number = +limit;

      const paginationOptions: PaginationOptions = {
        page: pageNumber,
        limit: limitNumber,
      };

      const sortingOptions: SortingOptions = {
        field: sortBy as string,
        order: sortOrder as 'asc' | 'desc',
      };

      const boardGames = await BoardGameRepository.findAllWithCount(
        paginationOptions,
        sortingOptions
      );

      const totalCount = await BoardGameRepository.countAll();

      const totalPages = Math.ceil(totalCount / limitNumber);

      return successResponseStatus(res, 'Get board games successfully', {
        boardGames,
        totalPages,
        currentPage: pageNumber,
        totalItems: totalCount,
      });
    } catch (error) {
      return handleError(500, res, error);
    }
  },

  create(req: Request, res: Response) {
    BoardGameRepository.create(req.body)
      .then((boardGame) => {
        return successResponseStatus(
          res,
          'Create board game successfully',
          boardGame
        );
      })
      .catch((error) => {
        return handleError(500, res, error);
      });
  },
  findOne(req: Request, res: Response) {
    BoardGameRepository.findOne(req.body)
      .then((boardGame) => {
        return successResponseStatus(
          res,
          'Get board game successfully',
          boardGame
        );
      })
      .catch((error) => {
        return handleError(500, res, error);
      });
  },
  findById(req: Request, res: Response) {
    BoardGameRepository.findById(req.params.id)
      .then((boardGame) => {
        return successResponseStatus(
          res,
          'Get board game successfully',
          boardGame
        );
      })
      .catch((error) => {
        return handleError(500, res, error);
      });
  },
  update(req: Request, res: Response) {
    BoardGameRepository.update(req.params.id, req.body)
      .then((boardGame) => {
        return successResponseStatus(
          res,
          'Update board game successfully',
          boardGame
        );
      })
      .catch((error) => {
        return handleError(500, res, error);
      });
  },
  delete(req: Request, res: Response) {
    BoardGameRepository.delete(req.params.id)
      .then((boardGame) => {
        return successResponseStatus(
          res,
          'Delete board game successfully',
          boardGame
        );
      })
      .catch((error) => {
        return handleError(500, res, error);
      });
  },
};

export default boardGameController;
