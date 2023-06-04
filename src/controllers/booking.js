import { BookingModel } from "../models/BookingModel.js";
import { PAGINATION } from "../constans/pagination.js";
import mongoose from "mongoose";

export const getAll = async (req, res) => {
  try {
    let booking = [];
    let page = parseInt(req.query?.page || 0);
    if (!page) page = 1;
    const skipPost = (page - 1) * PAGINATION.PAGE_SIZE;
    const total = await BookingModel.count();
    booking = await BookingModel.aggregate([
      {
        $lookup: {
          from: "rooms",
          localField: "numberRoom",
          foreignField: "number",
          as: "room",
        },
      },
      {
        $project: {
          fullName: 1,
          phone: 1,
          email: 1,
          identificationNumber: 1,
          status: 1,
          bookFrom: 1,
          bookTo: 1,
          numberRoom: 1,
          room: {
            $arrayElemAt: [
              {
                $map: {
                  input: "$room",
                  in: {
                    id: "$$this._id",
                    title: "$$this.name",
                    price: "$$this.price",
                  },
                },
              },
              0,
            ],
          },
        },
      },
    ])
      .skip(skipPost)
      .limit(PAGINATION.PAGE_SIZE);
    const response = {
      booking: [...booking],
      pagination: {
        page_size: PAGINATION.PAGE_SIZE,
        page: parseInt(req.query?.page) || 1,
        total: total,
        total_page: Math.ceil(booking.length / PAGINATION.PAGE_SIZE),
      },
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const create = async (req, res) => {
  try {
    const booking = new BookingModel(req.body);
    await booking.save();
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await BookingModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "rooms",
          localField: "numberRoom",
          foreignField: "number",
          as: "room",
        },
      },
    ]).exec();
    res.status(200).json({
      status: "Success",
      booking: booking[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
