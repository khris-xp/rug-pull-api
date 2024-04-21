import { request, Request, Response } from 'express';
import Booking from '../models/booking.model';
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

      const bookings = await BookingRepository.findAllWithCount(
        paginationOptions,
        sortingOptions
      );

      const totalCount = await BookingRepository.countAll();

      const totalPages = Math.ceil(totalCount / +limit);

      return successResponseStatus(res, 'Get bookings successfully', {
        bookings,
        totalPages,
        currentPage: +page,
        totalItems: totalCount,
      });
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
  async findByUserId(req: Request, res: Response) {
    try {
      const userId = req.user?._id;
      const { user_id } = req.body;
      if (!user_id && !userId) {
        return handleError(400, res, 'User ID is required');
      }
      if (user_id !== userId && req.user?.role !== 'admin') {
        return handleError(
          403,
          res,
          'You are not authorized to access this resource'
        );
      }
      const bookings = await Booking.find({ user: user_id }).lean();
      return successResponseStatus(res, 'Get bookings successfully', bookings);
    } catch (error) {
      return handleError(500, res, error);
    }
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
