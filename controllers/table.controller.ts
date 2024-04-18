import { Request, Response } from 'express';
import Booking from '../models/booking.model';
import Table from '../models/tabel.model';
import TableRepository from '../repositories/table.repository';
import { handleError } from '../utils/error.utils';
import { successResponseStatus } from '../utils/response.utils';

const tableController = {
  /**
   * @swagger
   * /api/tables:
   *   get:
   *     summary: Get all tables
   *     tags: [Table]
   *     responses:
   *       '200':
   *         description: Get tables successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 number:
   *                   type: string
   *                 capacity:
   *                   type: string
   */
  findAll: async (request: Request, response: Response) => {
    try {
      const tables = await TableRepository.findAll();
      return successResponseStatus(response, 'Get tables successfully', tables);
    } catch (error) {
      return handleError(500, response, error);
    }
  },
  /**
   * @swagger
   * /api/tables:
   *   post:
   *     summary: Create a new table
   *     tags: [Table]
   *     security:
   *        - Authorization: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               number:
   *                 type: string
   *               capacity:
   *                 type: string
   *   responses:
   *    '201':
   *     description: Create table successfully
   *     content:
   *        application/json:
   *          schema:
   *           type: object
   *           properties:
   *            _id:
   *              type: string
   *            number:
   *              type: string
   *            capacity:
   *              type: number
   */
  create: async (request: Request, response: Response) => {
    try {
      const table = await TableRepository.create(request.body);
      return successResponseStatus(
        response,
        'Create table successfully',
        table
      );
    } catch (error) {
      return handleError(500, response, error);
    }
  },

  /**
   * @swagger
   * /api/tables/{id}:
   *   get:
   *     summary: Get a table
   *     tags: [Table]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: A table ID
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Get table successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 number:
   *                   type: string
   *                 capacity:
   *                   type: string
   */
  findById: async (request: Request, response: Response) => {
    try {
      const table = await TableRepository.findOne({ _id: request.params.id });
      return successResponseStatus(response, 'Get table successfully', table);
    } catch (error) {
      return handleError(500, response, error);
    }
  },

  checkTableAlreadyBooked: async (request: Request, response: Response) => {
    try {
      const { table_id, start_time, end_time } = request.body;

      const booking = await Booking.findOne({
        table_id,
        start_time: { $lte: start_time },
        end_time: { $gte: end_time },
      });

      const isBooked = !!booking;

      return successResponseStatus(
        response,
        'Check table already booked',
        isBooked
      );
    } catch (error) {
      return handleError(500, response, error);
    }
  },

  checkTableAlreadyInRoom: async (request: Request, response: Response) => {
    try {
      const { table_id } = request.body;

      const tableisAlreadyinRoom = await Table.findOne({
        _id: table_id,
        room_id: { $ne: null },
      });

      const isAlreadyinRoom = !!tableisAlreadyinRoom;

      return successResponseStatus(
        response,
        'Check table already in room',
        isAlreadyinRoom
      );
    } catch (error) {
      return handleError(500, response, error);
    }
  },

  /**
   * @swagger
   * /api/tables/{id}:
   *   put:
   *     summary: Update a table
   *     tags: [Table]
   *     security:
   *        - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: A table ID
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               number:
   *                 type: string
   *               capacity:
   *                 type: string
   *   responses:
   *    '201':
   *     description: Update table successfully
   *     content:
   *        application/json:
   *          schema:
   *           type: object
   *           properties:
   *            _id:
   *              type: string
   *            number:
   *              type: string
   *            capacity:
   *              type: number
   */
  update: async (request: Request, response: Response) => {
    try {
      const table = await TableRepository.update(
        request.params.id,
        request.body
      );
      return successResponseStatus(
        response,
        'Update table successfully',
        table
      );
    } catch (error) {
      return handleError(500, response, error);
    }
  },

  /**
   * @swagger
   * /api/tables/{id}:
   *   delete:
   *     summary: Delete a table
   *     tags: [Table]
   *     security:
   *        - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: A table ID
   *         schema:
   *           type: string
   *   responses:
   *    '201':
   *     description: Delete table successfully
   *     content:
   *        application/json:
   *          schema:
   *           type: object
   *           properties:
   *            _id:
   *              type: string
   *            number:
   *              type: string
   *            capacity:
   *              type: number
   */
  delete: async (request: Request, response: Response) => {
    try {
      const table = await TableRepository.delete(request.params.id);
      return successResponseStatus(
        response,
        'Delete table successfully',
        table
      );
    } catch (error) {
      return handleError(500, response, error);
    }
  },
};

export default tableController;
