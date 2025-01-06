import dotenv from "dotenv";
dotenv.config();

export const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Ecommerce Application Server",
      version: "0.1.0",
      description: "Ecommerce Application Server",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: process.env.swagger_staging_url,
        description: "Ecommerce Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  paths: {
    "/": {
      get: {
        description: "Returns 'Hello <name>/stranger!!!' to the call",
      },
    },
  },
  apis: ["api/routes/*.ts"],
};
