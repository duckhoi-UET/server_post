import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./src/config/db.js";
import { route } from "./src/routers/index.js";

const PORT = process.env.PORT || 5000;

const app = express();

connectDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(cookieParser());

route(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
