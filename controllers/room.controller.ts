import { Request, Response } from 'express';
import RoomRepository from '../repositories/room.repository';
import { handleError } from '../utils/error.utils';
import { successResponseStatus } from '../utils/response.utils';

const roomController = {
  findAll(req: Request, res: Response) {
    RoomRepository.findAll()
      .then((rooms) => {
        return successResponseStatus(res, 'Get rooms successfully', rooms);
      })
      .catch((error) => {
        return handleError(res, error);
      });
  },
  create(req: Request, res: Response) {
    RoomRepository.create(req.body)
      .then((room) => {
        return successResponseStatus(res, 'Create room successfully', room);
      })
      .catch((error) => {
        return handleError(res, error);
      });
  },
  findOne(req: Request, res: Response) {
    RoomRepository.findOne(req.body)
      .then((room) => {
        return successResponseStatus(res, 'Get room successfully', room);
      })
      .catch((error) => {
        return handleError(res, error);
      });
  },
  findById(req: Request, res: Response) {
    RoomRepository.findById(req.params.id)
      .then((room) => {
        return successResponseStatus(res, 'Get room successfully', room);
      })
      .catch((error) => {
        return handleError(res, error);
      });
  },
  update(req: Request, res: Response) {
    RoomRepository.update(req.params.id, req.body)
      .then((room) => {
        return successResponseStatus(res, 'Update room successfully', room);
      })
      .catch((error) => {
        return handleError(res, error);
      });
  },
  delete(req: Request, res: Response) {
    RoomRepository.delete(req.params.id)
      .then((room) => {
        return successResponseStatus(res, 'Delete room successfully', room);
      })
      .catch((error) => {
        return handleError(res, error);
      });
  },
};

export default roomController;
