import { Request, Response } from 'express';
import CategoryRepository from '../repositories/category.repository';
import { handleError } from '../utils/error.utils';
import { successResponseStatus } from '../utils/response.utils';

const categoryController = {
  /**
   * @swagger
   * /api/categories:
   *   get:
   *     summary: Get all categories
   *     tags: [Category]
   *     responses:
   *       '200':
   *         description: Get categories successfully
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
      const categories = await CategoryRepository.findAll();
      return successResponseStatus(
        response,
        'Get categories successfully',
        categories
      );
    } catch (error) {
      return handleError(response, error);
    }
  },
  /**
   * @swagger
   * /api/categories:
   *   post:
   *     summary: Create a new category
   *     tags: [Category]
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
   *                type: string
   *     responses:
   *       '201':
   *         description: Create category successfully
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
      const category = await CategoryRepository.create(request.body);
      return successResponseStatus(
        response,
        'Create category successfully',
        category
      );
    } catch (error) {
      return handleError(response, error);
    }
  },

  /**
   * @swagger
   * /api/categories/{id}:
   *   get:
   *     summary: Get a category by id
   *     tags: [Category]
   *     security:
   *        - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Category id
   *     responses:
   *       '200':
   *         description: Get category successfully
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
   *                  type: string
   */

  findById: async (request: Request, response: Response) => {
    try {
      const category = await CategoryRepository.findById(request.params.id);
      return successResponseStatus(
        response,
        'Get category successfully',
        category
      );
    } catch (error) {
      return handleError(response, error);
    }
  },
  /**
   * @swagger
   * /api/categories/{id}:
   *   put:
   *     summary: Update a category by id
   *     tags: [Category]
   *     security:
   *        - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Category id
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
   *     responses:
   *       '200':
   *         description: Update category successfully
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
   */
  update: async (request: Request, response: Response) => {
    try {
      const category = await CategoryRepository.update(
        request.params.id,
        request.body
      );
      return successResponseStatus(
        response,
        'Update category successfully',
        category
      );
    } catch (error) {
      return handleError(response, error);
    }
  },
  /**
   * @swagger
   * /api/categories/{id}:
   *   delete:
   *     summary: Delete a category by id
   *     tags: [Category]
   *     security:
   *        - Authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: Category id
   *     responses:
   *       '200':
   *         description: Delete category successfully
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
   */
  delete: async (request: Request, response: Response) => {
    try {
      const category = await CategoryRepository.delete(request.params.id);
      return successResponseStatus(
        response,
        'Delete category successfully',
        category
      );
    } catch (error) {
      return handleError(response, error);
    }
  },
};

export default categoryController;
