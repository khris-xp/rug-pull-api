import { request, Request, Response } from 'express';
import BookingRepository from '../repositories/booking.repository';
import { PaginationOptions, SortingOptions } from '../types/options.type';
import { handleError } from '../utils/error.utils';
import { successResponseStatus } from '../utils/response.utils';
import { RequestValidator } from '../utils/validator.utils';

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
      return handleError(500, res, error);
    }
  },

  create(req: Request, res: Response) {
    RequestValidator(req.body);
    BookingRepository.create(req.body)
      .then((booking) => {
        return successResponseStatus(
          res,
          'Create booking successfully',
          booking
        );
      })
      .catch((error) => {
        return handleError(500, res, error);
      });
  },
  findOne(req: Request, res: Response) {
    BookingRepository.findOne(req.body)
      .then((booking) => {
        return successResponseStatus(res, 'Get booking successfully', booking);
      })
      .catch((error) => {
        return handleError(500, res, error);
      });
  },
  findById(req: Request, res: Response) {
    BookingRepository.findById(req.params.id)
      .then((booking) => {
        return successResponseStatus(res, 'Get booking successfully', booking);
      })
      .catch((error) => {
        return handleError(500, res, error);
      });
  },
  findByUserId(req: Request, res: Response) {
    const user_id = request.user?._id;
    BookingRepository.findOne({ user: user_id })
      .then((booking) => {
        return successResponseStatus(res, 'Get booking successfully', booking);
      })
      .catch((error) => {
        return handleError(500, res, error);
      });
  },
  updateBookingStatus(req: Request, res: Response) {
    const { id, status } = req.body;
    BookingRepository.update(id, status)
      .then((booking) => {
        return successResponseStatus(
          res,
          'Update booking status successfully',
          booking
        );
      })
      .catch((error) => {
        return handleError(500, res, error);
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
        return handleError(500, res, error);
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
        return handleError(500, res, error);
      });
  },
};

export default bookingController;
