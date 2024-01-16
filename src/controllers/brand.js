import { BrandModel } from "../models/BrandModel.js";
import { PAGINATION } from "../constans/pagination.js";

export const getAll = async (req, res) => {
  try {
    let brand = [];
    let page = parseInt(req.query?.page || 0);
    if (!page) page = 1;
    const skipPost = (page - 1) * PAGINATION.PAGE_SIZE;
    const total = await BrandModel.count();
    brand = await BrandModel.find({})
      .skip(skipPost)
      .limit(PAGINATION.PAGE_SIZE);
    const start = skipPost + 1;
    const end = Math.min(start + PAGINATION.PAGE_SIZE - 1, total);
    const response = {
      brand: [...brand],
      pagination: {
        start: start,
        end: end,
        page_size: PAGINATION.PAGE_SIZE,
        page: parseInt(req.query?.page) || 1,
        total: total,
        total_page: Math.ceil(brand.length / PAGINATION.PAGE_SIZE),
      },
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createBrand = async (req, res) => {
  try {
    const brand = new BrandModel({ ...req.body });
    await brand.save();
    res.status(200).json(brand);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};
