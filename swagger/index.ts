import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your application',
    },
    components: {
      securitySchemes: {
        Authorization: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          value: '<JWT token here>',
        },
      },
    },
  },
  apis: ['./controllers/*.ts'],
};

const specs = swaggerJsdoc(options);

export const swaggerSetup = (app: Express) => {
  app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
};
