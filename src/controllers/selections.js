import { RoomsModel } from "../models/RoomsModel.js";

export const selectionRoom = async (req, res) => {
  try {
    const rooms = await RoomsModel.find({}, { name: 1, number: 1 });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
