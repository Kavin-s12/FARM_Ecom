import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//@desc     fetch all product
//@api      GET /api/products/
//@access   public
export const getProducts = asyncHandler(async (req, res) => {
  res.status(200).send(await Product.find());
});

//@desc     fetch single product by ID
//@api      GET /api/products/:id
//@access   public
export const getProductById = asyncHandler(async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    res.status(200).send(foundProduct);
  } else {
    res.status(404).send({ message: "product not found" });
  }
});

//@desc    Delete product
//@api     DELETE /api/products/:id
//@access  Private/ ADMIN
export const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (product) {
    res.json({ message: "product removed" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

//@desc    Create product
//@api     POST /api/products
//@access  Private/ ADMIN
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample name",
    image: "/images/coconut.jfif",
    description: "sample description",
    category: "sample category",
    brand: "sample brand",
    user: req.user._id,
  });
  const createdProduct = await product.save();
  res.json(createdProduct);
});

//@desc    update product
//@api     PUT /api/products/:id
//@access  Private/ ADMIN
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    category,
    brand,
    countInStock,
    price,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.image = image;
    product.description = description;
    product.category = category;
    product.brand = brand;
    product.countInStock = countInStock;
    product.price = price;

    await product.save();
    res.json({ message: "product updated" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});
