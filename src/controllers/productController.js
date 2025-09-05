import Product from "../models/Product.js";

// Create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const businessId = req.user.id;

    if (!name || !description || !price || !stock || !category) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      businessId,
    });

    return res.status(201).json({
      success: newProduct ? true : false,
      message: newProduct
        ? "Product created successfully"
        : "Product not created",
      data: newProduct ? newProduct : null,
    });
  } catch (error) {
    console.log("Error in create product controller", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all products for a business
export const getProducts = async (req, res) => {
  try {
    const { name, category } = req.query;
    const query = { businessId: req.user.id };

    if (name) query.name = { $regex: name, $options: "i" };
    if (category) query.category = { $regex: category, $options: "i" };

    const products = await Product.find(query).lean();

    return res.status(200).json({
      success: products ? true : false,
      message: products ? "Products fetched successfully" : "No products found",
      count: products ? products.length : 0,
      data: products ? products : null,
    });
  } catch (error) {
    console.log("Error in get products controller", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const updatedProduct = await Product.findOne({
      _id: req.params.id,
      businessId: req.user.id,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    updatedProduct.name = name || updatedProduct.name;
    updatedProduct.description = description || updatedProduct.description;
    updatedProduct.price = price || updatedProduct.price;
    updatedProduct.stock = stock || updatedProduct.stock;
    updatedProduct.category = category || updatedProduct.category;
    await updatedProduct.save();

    return res.status(200).json({
      success: updatedProduct ? true : false,
      message: updatedProduct
        ? "Product updated successfully"
        : "Product not updated",
      data: updatedProduct ? updatedProduct : null,
    });
  } catch (error) {
    console.log("Error in update product controller", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id,
      businessId: req.user.id,
    });

    return res.status(200).json({
      success: deletedProduct ? true : false,
      message: deletedProduct
        ? "Product deleted successfully"
        : "Product not deleted",
      data: deletedProduct ? deletedProduct : null,
    });
  } catch (error) {
    console.log("Error in delete product controller", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
