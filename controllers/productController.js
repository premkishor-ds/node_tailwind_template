// controllers/productController.js

const Product = require('../models/ProductModel');

// Get all products with options for pagination, sorting, and filtering
exports.getAllProducts = async (req, res) => {
  try {
    const { limit = 10, offset = 0, input, sortBy = 'name', sortOrder = 'asc', locale, ...filters } = req.query;

    // Construct query based on locale and other filters
    const query = locale ? { ...filters, locale } : filters;

    // Construct search query
    let searchQuery = {};
    if (input) {
      searchQuery = { $text: { $search: input } };
    }

    // Combine search and other queries
    const combinedQuery = { ...query, ...searchQuery };

    // Fetch total count of products
    const totalCount = await Product.countDocuments(combinedQuery);

    // Fetch paginated product list
    const products = await Product.find(combinedQuery)
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .sort({ [sortBy]: sortOrder });

    // Construct response object including total count
    const response = {
      totalCount,
      products
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    Object.assign(product, req.body);
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
