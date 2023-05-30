import { PostsModel } from "../models/PostsModel.js";
import { PAGINATION } from "../constans/pagination.js";

export const getPosts = async (req, res) => {
  try {
    let posts = [];
    const page = parseInt(req.query?.page);
    if (page) {
      if (page < 1) page = 1;
      const skipPost = (page - 1) * PAGINATION.PAGE_SIZE;
      posts = await PostsModel.find({})
        .skip(skipPost)
        .limit(PAGINATION.PAGE_SIZE);
    } else {
      posts = await PostsModel.find();
    }
    const response = {
      posts: [...posts],
      pagination: {
        page_size: PAGINATION.PAGE_SIZE,
        page: parseInt(req.query?.page) || 1,
        total: posts.length,
        total_page: Math.ceil(posts.length / PAGINATION.PAGE_SIZE),
      },
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = req.body;
    const post = new PostsModel(newPost);
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getDetailPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await PostsModel.findOne({ _id: id });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const post = await PostsModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await PostsModel.deleteOne({ _id: id });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
