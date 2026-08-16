const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: String,
    author: {
      type: String,
      default: 'Admin',
    },
    imageUrl: String,
    category: {
      type: String,
      enum: ['Breaking', 'Review', 'Interview', 'Event', 'Community'],
      default: 'Breaking',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('News', newsSchema);
