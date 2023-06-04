import { RoomsModel } from "../models/RoomsModel.js";
import { PAGINATION } from "../constans/pagination.js";

export const getAll = async (req, res) => {
  try {
    let rooms = [];
    let page = parseInt(req.query?.page || 0);
    if (!page) page = 1;
    const skipPost = (page - 1) * PAGINATION.PAGE_SIZE;
    const total = await RoomsModel.count();
    rooms = await RoomsModel.find({})
      .skip(skipPost)
      .limit(PAGINATION.PAGE_SIZE);
    const response = {
      rooms: [...rooms],
      pagination: {
        page_size: PAGINATION.PAGE_SIZE,
        page: parseInt(req.query?.page) || 1,
        total: total,
        total_page: Math.ceil(rooms.length / PAGINATION.PAGE_SIZE),
      },
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getDetailRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const room = await RoomsModel.findOne({ _id: id });
    res.status(200).json({
      status: "Success",
      room: room,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const room = await RoomsModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    res.status(200).json({
      status: "Success",
      room: room,
    });
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

export const deleteRoom = async (req, res) => {
  try {
    const id = req.params.id;
    const room = await RoomsModel.deleteOne({ _id: id });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
