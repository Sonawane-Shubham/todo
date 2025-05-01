import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Todo API",
    version: "1.0.0",
    description: "API for managing todos with authentication",
  },
  servers: [{ url: "http://localhost:4000/api" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*routes.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwaggerDocs = (app) => {
  app.use("/todo-api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
