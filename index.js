import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import posts from "./routers/posts.js";
import rooms from "./routers/rooms.js";
import auth from "./routers/auth.js";

const PORT = process.env.PORT || 5000;

const URI_DB =
  "mongodb+srv://khoinguyen2000bg:123456789aA%40@mern-app.j110qj0.mongodb.net/test";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(cookieParser());

app.use("/", auth);
app.use("/posts", posts);
app.use("/rooms", rooms);
app.use("/", (req, res) => {
  res.json({ message: "Welcome to Khoi's blog page" });
});

mongoose
  .connect(URI_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connect Success!!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
