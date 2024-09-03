import express from "express";
import cors from "cors";
import { mongodb_connection } from "./database";
import dotenv from "dotenv";

const app = express();
const port = 5000;
app.use(cors());
dotenv.config();

mongodb_connection();

app.listen(port, () => {
  console.log(`Backend: Running in port ${port}`);
  console.log(`Front-end:  http://localhost:${port}/`);
});
