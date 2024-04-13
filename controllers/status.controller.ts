import { Request, Response } from 'express';
import StatusRepository from '../repositories/status.repository';
import { handleError } from '../utils/error.utils';
import { successResponseStatus } from '../utils/response.utils';

const statusController = {
  /**
   * @swagger
   * /api/statuses:
   *   get:
   *     summary: Get all statuses
   *     tags: [Status]
   *     responses:
   *       '200':
   *         description: Get statuses successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 name:
   *                   type: string
   *                 description:
   *                   type: string
   *                 topics:
   *                   type: string
   */
  findAll: async (request: Request, response: Response) => {
    try {
      const statuses = await StatusRepository.findAll();
      return successResponseStatus(
        response,
        'Get statuses successfully',
        statuses
      );
    } catch (error) {
      return handleError(500, response, error);
    }
  },
  /**
   * @swagger
   * /api/statuses:
   *   post:
   *     summary: Create a new status
   *     tags: [Status]
   *     security:
   *        - Authorization: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *               topics:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Create status successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 name:
   *                   type: string
   *                 description:
   *                   type: string
   *                 topics:
   *                   type: string
   */
  create: async (request: Request, response: Response) => {
    try {
      const status = await StatusRepository.create(request.body);
      return successResponseStatus(
        response,
        'Create status successfully',
        status
      );
    } catch (error) {
      return handleError(500, response, error);
    }
  },

  /**
   * @swagger
   * /api/statuses/{id}:
   *   get:
   *     summary: Get a status
   *     tags: [Status]
   *     security:
   *        - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Get status successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 name:
   *                   type: string
   *                 description:
   *                   type: string
   *                 topics:
   *                   type: string
   */
  findOne: async (request: Request, response: Response) => {
    try {
      const status = await StatusRepository.findOne({ _id: request.params.id });
      return successResponseStatus(response, 'Get status successfully', status);
    } catch (error) {
      return handleError(500, response, error);
    }
  },

  /**
   * @swagger
   * /api/statuses/{id}:
   *   put:
   *     summary: Update a status
   *     tags: [Status]
   *     security:
   *        - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *               topics:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Update status successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 name:
   *                   type: string
   *                 description:
   *                   type: string
   *                 topics:
   *                   type: string
   */
  update: async (request: Request, response: Response) => {
    try {
      const status = await StatusRepository.update(
        request.params.id,
        request.body
      );
      return successResponseStatus(
        response,
        'Update status successfully',
        status
      );
    } catch (error) {
      return handleError(500, response, error);
    }
  },
  /**
   * @swagger
   * /api/statuses/{id}:
   *   delete:
   *     summary: Delete a status
   *     tags: [Status]
   *     security:
   *        - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Delete status successfully
   *       '404':
   *         description: Status not found
   */
  delete: async (request: Request, response: Response) => {
    try {
      const status = await StatusRepository.delete(request.params.id);
      return successResponseStatus(
        response,
        'Delete status successfully',
        status
      );
    } catch (error) {
      return handleError(500, response, error);
    }
  },
};

export default statusController;
