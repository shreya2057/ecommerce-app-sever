import express from "express";
import cors from "cors";
import { mongodb_connection } from "./database";
import dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { options } from "./config/swagger";

const app = express();
const port = 8000;
app.use(cors());
dotenv.config();

mongodb_connection();

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

app.get("/", (_, res) => {
  res.send("Server is running");
});

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { customCssUrl: CSS_URL })
);

app.listen(port, () => {
  console.log(`Backend: Running in port ${port}`);
});
