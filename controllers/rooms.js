import { RoomsModel } from "../models/RoomsModel.js";
import { PAGINATION } from "../constans/pagination.js";

export const getAll = async (req, res) => {
  try {
    let rooms = [];
    const page = parseInt(req.query?.page);
    if (page) {
      if (page < 1) page = 1;
      const skipPost = (page - 1) * PAGINATION.PAGE_SIZE;
      rooms = await RoomsModel.find({})
        .skip(skipPost)
        .limit(PAGINATION.PAGE_SIZE);
    } else {
      rooms = await RoomsModel.find();
    }
    const response = {
      rooms: [...rooms],
      pagination: {
        page_size: PAGINATION.PAGE_SIZE,
        page: parseInt(req.query?.page) || 1,
        total: rooms.length,
        total_page: Math.ceil(rooms.length / PAGINATION.PAGE_SIZE),
      },
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createRoom = async (req, res) => {
  try {
    const room = new RoomsModel(req.body);
    await room.save();
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
