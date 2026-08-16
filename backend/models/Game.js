const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    platform: [String], // ['PC', 'PS5', 'Xbox', 'Nintendo Switch']
    releaseDate: {
      type: Date,
      required: true,
    },
    developer: String,
    publisher: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    reviews: Number,
    imageUrl: String,
    price: Number,
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Game', gameSchema);
