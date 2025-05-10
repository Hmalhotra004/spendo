import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { connectDB } from "./lib/db";
import router from "./router";

const PORT = process.env.PORT;

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/", router());

// const server = http.createServer(app);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:3000`);
  connectDB();
});
