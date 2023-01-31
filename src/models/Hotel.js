const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const HotelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "hotel name is required"],
    },

    type: {
      type: String,
      required: [true, "hotel type is required"],
    },

    location: {
      street: {
        type: String,
      },

      urban: {
        type: String,
      },

      city: {
        type: String,
        required: [true, "hotel city location is required"],
      },

      country: {
        type: String,
        required: [true, "hotel country location is required"],
      },

      locationAccess: String,

      rating: String,
    },

    media: {
      type: [String],
    },

    thumbnail: {
      type: String,
    },

    description: {
      title: String,
      main: {
        type: String,
        required: [true, "hotel description is required"],
      },
      short: String,
    },

    label: {
      title: {
        type: String,
      },
      text: {
        type: String,
      },
    },

    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },

    rooms: {
      type: [
        {
          type: Schema.ObjectId,
          ref: "Room",
        },
      ],
    },

    minPrice: {
      price: {
        type: Number,
        required: [true, "hotel min price is required"],
      },
      taxi: {
        type: Boolean,
        default: false,
      },
    },

    freeCancelation: {
      type: Boolean,
      default: false,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    features: {
      parking: { type: Boolean, default: false },
      airConditioning: { type: Boolean, default: false },
      privateBathroom: { type: Boolean, default: false },
      wifi: { type: Boolean, default: false },
      shower: { type: Boolean, default: false },
      minibar: { type: Boolean, default: false },
      tv: { type: Boolean, default: false },
      roomService: { type: Boolean, default: false },
      smoking: { type: Boolean, default: false },
      forDisabledGuests: { type: Boolean, default: false },
      petFriendly: { type: Boolean, default: false },
      restaurant: { type: Boolean, default: false },
      terrace: { type: Boolean, default: false },
      fitnessCenter: { type: Boolean, default: false },
      familyRooms: { type: Boolean, default: false },
      garden: { type: Boolean, default: false },
      oceanView: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

const Hotel = model("Hotel", HotelSchema);
module.exports = Hotel;
