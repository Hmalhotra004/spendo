import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import router from "./router";

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

const server = http.createServer(app);

server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});

mongoose.Promise = Promise;
mongoose.connect(
  "mongodb+srv://hardikmalhotra150804:Z90At3GDzJb3AlXA@cluster0.banec3w.mongodb.net/spendo?retryWrites=true&w=majority&appName=Cluster0"
);
mongoose.connection.on("error", (error: Error) => console.log(error));
