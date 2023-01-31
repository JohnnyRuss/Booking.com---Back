const asyncWrapper = require("../utils/asyncWrapper");
const AppError = require("../utils/AppError");
const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");

exports.createRoom = asyncWrapper(async function (req, res, next) {
  const { hotelId } = req.params;
  const body = req.body;

  const newRoom = new Room({ ...body, hotel: hotelId });
  await newRoom.save();

  const cheapestRoom = await Room.find({ hotel: hotelId })
    .sort({ price: 1 })
    .limit(1)
    .select("price");

  await Hotel.findByIdAndUpdate(hotelId, {
    $push: { rooms: newRoom._id },
    $set: { "minPrice.price": cheapestRoom[0].price },
  });

  res.status(201).json(newRoom);
});

exports.insertNewRoom = asyncWrapper(async function (req, res, next) {
  const { roomId } = req.params;
  const body = req.body;

  const updatedRooms = await Room.findByIdAndUpdate(
    roomId,
    {
      $push: { roomsNumbers: body },
    },
    { new: true }
  );
  res.status(201).json(updatedRooms);
});

exports.updateRoom = asyncWrapper(async function (req, res, next) {
  const body = req.body;
  const { roomId } = req.params;

  const updatedRoom = await Room.findByIdAndUpdate(
    roomId,
    { $set: body },
    { new: true }
  );

  if (!updatedRoom) return next(new AppError(404, "room does not exists"));

  res.status(201).json(updatedRoom);
});

exports.deleteRoom = asyncWrapper(async function (req, res, next) {
  const { hotelId, roomId } = req.params;

  const deletedRoom = await Room.findByIdAndDelete(roomId);

  if (!deletedRoom) return next(new AppError(404, "room does not exists"));

  await Hotel.findByIdAndUpdate(hotelId, { $pulll: { rooms: roomId } });

  res.status(204).json({ deleted: true });
});

exports.getRoom = asyncWrapper(async function (req, res, next) {
  const { roomId } = req.params;

  const room = await Room.findById(roomId);

  if (!room) return next(new AppError(404, "room does not exists"));

  res.status(200).json(room);
});

exports.getHotelRooms = asyncWrapper(async function (req, res, next) {
  const { hotelId } = req.params;

  const rooms = await Room.find({ hotel: hotelId });

  res.status(200).json(rooms);
});

exports.reserveRoom = asyncWrapper(async function (req, res, next) {
  const { roomId } = req.params;
  const { num } = req.query;
  const body = req.body;

  const updatedRoom = await Room.findByIdAndUpdate(
    roomId,
    { $push: { "roomsNumbers.$[roomNum].unAvailableDates": body } },
    { arrayFilters: [{ "roomNum.number": +num }], new: true }
  );

  res.status(201).json(updatedRoom);
});
