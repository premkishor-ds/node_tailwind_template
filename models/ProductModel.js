const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const productSchema = new mongoose.Schema({
  name: [translationSchema],
  price: {
    type: Number,
    required: true
  },
  description: [translationSchema],
  category: [translationSchema]
});

// Create text index on name and description fields for text search
productSchema.index({ 'name.content': 'text', 'description.content': 'text' });

module.exports = mongoose.model('Product', productSchema);
