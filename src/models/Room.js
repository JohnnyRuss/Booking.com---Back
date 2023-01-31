const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const RoomSchema = new Schema(
  {
    hotel: {
      type: String,
      required: [true, "hotel id is required"],
    },

    title: {
      type: String,
      required: [true, "room title is required"],
    },

    price: {
      type: Number,
      required: [true, "room price is required"],
    },

    maxPeople: {
      type: Number,
      required: [true, "room max people count is required"],
    },

    // description: {
    //   type: String,
    //   required: [true, "room description is required"],
    // },

    roomsNumbers: [
      {
        number: {
          type: Number,
        },
        unAvailableDates: {
          type: [
            {
              start: Date,
              end: Date,
            },
          ],
        },
      },
    ],

    rooms: {
      type: { type: String },
      space: Number,
      bathroom: Number,
      bedroom: Number,
      kitchen: Number,
    },
  },
  { timestamps: true }
);

const Room = model("Room", RoomSchema);

module.exports = Room;
