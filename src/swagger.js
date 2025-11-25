const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tasks API',
      version: '1.0.0'
    },
    servers: [{ url: process.env.SWAGGER_SERVER || 'http://localhost:4000/api/v1' }]
  },
  apis: ['./src/routes/v1/*.js', './src/models/*.js'] // you can add JSDoc comments to routes
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
