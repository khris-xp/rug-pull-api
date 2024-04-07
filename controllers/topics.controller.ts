import { Request, Response } from 'express';
import TopicRepository from '../repositories/topic.repository';
import { handleError } from '../utils/error.utils';
import { successResponseStatus } from '../utils/response.utils';

const topicController = {
  /**
   * @swagger
   * /api/topics:
   *   get:
   *     summary: Get all topics
   *     tags: [Topic]
   *     responses:
   *       '200':
   *         description: Get topics successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 title:
   *                   type: string
   *                 description:
   *                   type: string
   */
  findAll: async (request: Request, response: Response) => {
    try {
      const topics = await TopicRepository.findAll();
      return successResponseStatus(response, 'Get topics successfully', topics);
    } catch (error) {
      return handleError(response, error);
    }
  },
  /**
   * @swagger
   * /api/topics:
   *   post:
   *     summary: Create a new topic
   *     tags: [Topic]
   *     security:
   *        - Authorization: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               description:
   *                 type: string
   *     responses:
   *       '201':
   *         description: Create topic successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 title:
   *                   type: string
   *                 description:
   *                   type: string
   */
  create: async (request: Request, response: Response) => {
    try {
      const { title, description } = request.body;

      const topic = await TopicRepository.create({ title, description });
      return successResponseStatus(
        response,
        'Create Topic Successfully',
        topic
      );
    } catch (error) {
      return handleError(response, error);
    }
  },

  /**
   * @swagger
   * /api/topics/{id}:
   *   get:
   *     summary: Get a topic by id
   *     tags: [Topic]
   *     security:
   *        - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Topic id
   *     responses:
   *       '200':
   *         description: Get topic successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 title:
   *                   type: string
   *                 description:
   *                   type: string
   */
  findById: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const topic = await TopicRepository.findById(id);
      return successResponseStatus(
        response,
        'Get topics by id successfully',
        topic
      );
    } catch (error) {
      return handleError(response, error);
    }
  },

  /**
   * @swagger
   * /api/topics/{id}:
   *   put:
   *     summary: Update a topic by id
   *     tags: [Topic]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Topic id
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               description:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Update topic successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 title:
   *                   type: string
   *                 description:
   *                   type: string
   */
  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { title, description } = request.body;
      const topic = await TopicRepository.update(id, { title, description });
      return successResponseStatus(
        response,
        'Update topic successfully',
        topic
      );
    } catch (error) {
      return handleError(response, error);
    }
  },

  /**
   * @swagger
   * /api/topics/{id}:
   *   delete:
   *     summary: Delete a topic by id
   *     tags: [Topic]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Topic id
   *     responses:
   *       '200':
   *         description: Delete topic successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 _id:
   *                   type: string
   *                 title:
   *                   type: string
   *                 description:
   *                   type: string
   */
  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const topic = await TopicRepository.delete(id);
      return successResponseStatus(
        response,
        'Delete topic successfully',
        topic
      );
    } catch (error) {
      return handleError(response, error);
    }
  },
};

export default topicController;
