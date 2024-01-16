import { RoomsModel } from "../models/RoomsModel.js";
import { BrandModel } from "../models/BrandModel.js";
import { CategoryModel } from "../models/CategoryModel.js";

export const selectionRoom = async (req, res) => {
  try {
    const rooms = await RoomsModel.find({}, { name: 1, number: 1 });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const selectionCategory = async (req, res) => {
  try {
    const category = await CategoryModel.find({}, { name: 1, number: 1 });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const selectionBrand = async (req, res) => {
  try {
    const brand = await BrandModel.find({}, { name: 1, number: 1 });
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
