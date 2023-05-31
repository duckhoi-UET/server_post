import { RoomsModel } from "../models/RoomsModel";

export const createRoom = async (req, res) => {
  try {
    const room = new RoomsModel(req.body);
    await room.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
