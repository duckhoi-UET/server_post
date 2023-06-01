import { RoomsModel } from "../models/RoomsModel.js";

export const createRoom = async (req, res) => {
  try {
    const room = new RoomsModel(req.body);
    await room.save();
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
