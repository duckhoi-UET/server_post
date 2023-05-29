import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import posts from "./routers/posts.js";
import { PostsModel } from "./models/PostsModel.js";

const PORT = process.env.PORT || 5000;

const URI_DB =
  "mongodb+srv://khoinguyen2000bg:123456789aA%40@mern-app.j110qj0.mongodb.net/";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.use("/posts", posts);
app.use("/", async (req, res) => {
  try {
    const posts = await PostsModel.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error });
  }
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
