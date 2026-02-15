import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { options } from "./config/swagger";
import categories_routes from "./routes/categories";
import product_routes from "./routes/products";
import auth_routes from "./routes/auth";
import cart_routes from "./routes/carts";
import bodyParser from "body-parser";
import { connectDB, disconnectDB } from "./config/prisma";

const app = express();
const port = 8000;
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

connectDB();

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

app.get("/", (_, res) => {
  res.send("Server is running");
});

const swaggerSpec = swaggerJsdoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: CSS_URL,
  }),
);

app.use("/categories", categories_routes);
app.use("/products", product_routes);
app.use("/users", auth_routes);
app.use("/carts", cart_routes);

process.on("SIGINT", () => {
  disconnectDB();
  process.exit(0);
});

process.on("SIGTERM", () => {
  disconnectDB();
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Backend: Running in port ${port}`);
});
