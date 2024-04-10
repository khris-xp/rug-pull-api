import { Request, Response } from 'express';
import BoardGameRepository from '../repositories/board-game.repository';
import { handleError } from '../utils/error.utils';
import { successResponseStatus } from '../utils/response.utils';

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface SortingOptions {
  field: string;
  order: 'asc' | 'desc';
}

const boardGameController = {
  async findAll(req: Request, res: Response) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'name',
        sortOrder = 'asc',
      } = req.query;
      const paginationOptions: PaginationOptions = {
        page: +page,
        limit: +limit,
      };
      const sortingOptions: SortingOptions = {
        field: sortBy as string,
        order: sortOrder as 'asc' | 'desc',
      };

      const boardGames = await BoardGameRepository.findAll(
        paginationOptions,
        sortingOptions
      );

      return successResponseStatus(
        res,
        'Get board games successfully',
        boardGames
      );
    } catch (error) {
      return handleError(res, error);
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
        return handleError(res, error);
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
        return handleError(res, error);
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
        return handleError(res, error);
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
        return handleError(res, error);
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
        return handleError(res, error);
      });
  },
};

export default boardGameController;
