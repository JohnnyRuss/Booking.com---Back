import { AppError, asyncWrapper } from "../utils/index.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
// import data from "../../data.json" assert { type: "json" };

import { API_Features } from "../utils/index.js";

export const createHotel = asyncWrapper(async function (req, res, next) {
  const body = req.body;

  const newHotel = await Hotel.create(body);

  res.status(201).json(newHotel);
});

export const updateHotel = asyncWrapper(async function (req, res, next) {
  const body = req.body;
  const { hotelId } = req.params;

  const updatedHotel = await Hotel.findByIdAndUpdate(
    hotelId,
    { $set: body },
    { new: true }
  );

  if (!updatedHotel) return next(new AppError(404, "hotel does not exists"));

  res.status(201).json(updatedHotel);
});

export const deleteHotel = asyncWrapper(async function (req, res, next) {
  const { hotelId } = req.params;

  const deletedHotel = await Hotel.findByIdAndDelete(hotelId);

  if (!deletedHotel) return next(new AppError(404, "hotel does not exists"));

  await Room.deleteMany({ hotel: hotelId });

  res.status(204).json({ deleted: true });
});

export const getHotel = asyncWrapper(async function (req, res, next) {
  const { hotelId } = req.params;

  const hotel = await Hotel.findById(hotelId);

  if (!hotel) return next(new AppError(404, "hotel does not exists"));

  res.status(200).json(hotel);
});

export const getHotels = asyncWrapper(async function (req, res, next) {
  const { doc } = new API_Features(Hotel.find(), req.query).filter();

  const hotels = await doc
    .populate({
      path: "rooms",
      options: {
        sort: { price: 1 },
        limit: 1,
      },
      select: "rooms",
      transform: (doc) => {
        return doc?.rooms;
      },
    })
    .select(
      "_id name thumbnail location.locationAccess location.country location.rating minPrice description.short freeCancelation rating rooms"
    );

  res.status(200).json(hotels);
});

export const hotelsByPropertyType = asyncWrapper(async function (
  req,
  res,
  next
) {
  const byTypes = await Hotel.aggregate([
    { $match: {} },

    {
      $project: {
        type: 1,
        thumbnail: 1,
        _id: 1,
      },
    },

    {
      $group: {
        _id: "$type",
        thumbnail: { $first: "$thumbnail" },
        id: { $first: "$_id" },
        count: { $sum: 1 },
        type: { $first: "$type" },
      },
    },

    { $sort: { count: -1 } },
  ]);

  res.status(200).json(byTypes);
});

export const hotelsByCity = asyncWrapper(async function (req, res, next) {
  const byCity = await Hotel.aggregate([
    { $match: {} },

    {
      $project: {
        "location.city": 1,
        thumbnail: 1,
        _id: 1,
      },
    },

    {
      $group: {
        _id: "$location.city",
        thumbnail: { $first: "$thumbnail" },
        id: { $first: "$_id" },
        city: { $first: "$location.city" },
        count: { $sum: 1 },
      },
    },

    { $sort: { count: -1 } },

    { $limit: 5 },
  ]);

  res.status(200).json(byCity);
});

export const exploreCountry = asyncWrapper(async function (req, res, next) {
  const { country } = req.query;

  const countryToExplore = await Hotel.aggregate([
    { $match: { "location.country": country } },

    {
      $project: {
        "location.city": 1,
        thumbnail: 1,
        _id: 1,
      },
    },

    {
      $group: {
        _id: "$location.city",
        thumbnail: { $first: "$thumbnail" },
        id: { $first: "$_id" },
        city: { $first: "$location.city" },
        count: { $sum: 1 },
      },
    },

    { $sort: { count: -1 } },

    { $limit: 6 },
  ]);

  res.status(200).json({ locations: countryToExplore, country });
});

async function updater() {
  // await Hotel.deleteMany();
  await Promise.all(data.map(async (h) => await Hotel.create(h)));
}
// updater();
