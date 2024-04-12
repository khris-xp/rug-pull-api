import { Request, Response } from 'express';
import BookingRepository from '../repositories/booking.repository';
import { PaginationOptions, SortingOptions } from '../types/options.type';
import { handleError } from '../utils/error.utils';
import { successResponseStatus } from '../utils/response.utils';

const bookingController = {
  async findAll(req: Request, res: Response) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'start_time',
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

      const bookings = await BookingRepository.findAll(
        paginationOptions,
        sortingOptions
      );

      return successResponseStatus(res, 'Get bookings successfully', bookings);
    } catch (error) {
      return handleError(res, error);
    }
  },

  create(req: Request, res: Response) {
    BookingRepository.create(req.body)
      .then((booking) => {
        return successResponseStatus(
          res,
          'Create booking successfully',
          booking
        );
      })
      .catch((error) => {
        return handleError(res, error);
      });
  },
  findOne(req: Request, res: Response) {
    BookingRepository.findOne(req.body)
      .then((booking) => {
        return successResponseStatus(res, 'Get booking successfully', booking);
      })
      .catch((error) => {
        return handleError(res, error);
      });
  },
  findById(req: Request, res: Response) {
    BookingRepository.findById(req.params.id)
      .then((booking) => {
        return successResponseStatus(res, 'Get booking successfully', booking);
      })
      .catch((error) => {
        return handleError(res, error);
      });
  },
  update(req: Request, res: Response) {
    BookingRepository.update(req.params.id, req.body)
      .then((booking) => {
        return successResponseStatus(
          res,
          'Update booking successfully',
          booking
        );
      })
      .catch((error) => {
        return handleError(res, error);
      });
  },
  delete(req: Request, res: Response) {
    BookingRepository.delete(req.params.id)
      .then((booking) => {
        return successResponseStatus(
          res,
          'Delete booking successfully',
          booking
        );
      })
      .catch((error) => {
        return handleError(res, error);
      });
  },
};

export default bookingController;
