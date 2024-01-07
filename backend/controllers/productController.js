import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
import redisClient from "../redisClient.js";

//@desc     fetch all product
//@api      GET /api/products/
//@access   public
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  res.status(200).send({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc     fetch single product by ID
//@api      GET /api/products/:id
//@access   public
export const getProductById = asyncHandler(async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    const serializedProduct = JSON.stringify(foundProduct);
    redisClient.setEx(req.params.id, 3600, serializedProduct);
    res.status(200).send(foundProduct);
  } else {
    res.status(404).send({ message: "product not found" });
  }
});

//@desc     fetch Top 3 review product
//@api      GET /api/products/topreview
//@access   public
export const getTopReviewProduct = asyncHandler(async (req, res) => {
  const foundProduct = await Product.find().sort({ review: -1 }).limit(3);

  res.status(200).send(foundProduct);
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
    image: "/images/sample.jpg",
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
  const { name, image, description, category, brand, countInStock, price } =
    req.body;
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

//@desc    Create new review
//@api     PUT /api/products/:id/review
//@access  Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() == req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(404);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});
