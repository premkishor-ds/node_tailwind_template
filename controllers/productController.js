const Product = require('../models/ProductModel');

// Get all products with options for pagination, sorting, and filtering

exports.getAllProducts = async (req, res) => {
  try {
    const { limit = 10, offset = 0, input, sortBy = 'name', sortOrder = 'asc', locale, language, category } = req.query;

    // Construct query based on locale, language, and other filters
    const query = {};
    if (locale) query.locale = locale;
    if (language) query['name.language'] = language;
    if (language) query['description.language'] = language;
    if (language) query['category.language'] = language;
    if (category) query['category.content'] = category;

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

    // Process products to flatten translation objects based on the language
    const formattedProducts = products.map(product => ({
      _id: product._id,
      name: product.name.find(translation => translation.language === language).content,
      price: product.price,
      description: product.description.find(translation => translation.language === language).content,
      category: product.category.find(translation => translation.language === language).content
    }));

    // Construct response object including total count and formatted products
    const response = {
      totalCount,
      language,
      products: formattedProducts
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Ensure that only allowed fields are updated
    const allowedFields = ['name', 'price', 'description', 'category'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

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
