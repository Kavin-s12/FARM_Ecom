import express from "express";
import {
  getProducts,
  getProductById,
  deleteProductById,
  updateProduct,
  createProduct,
  createProductReview,
  getTopReviewProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { Cache, removeCache } from "../middleware/cacheMiddleware.js";

const productRouter = express.Router();

productRouter.route("/").get(getProducts).post(protect, admin, createProduct);
productRouter.route("/topreview").get(getTopReviewProduct);
productRouter
  .route("/:id")
  .get(Cache, getProductById)
  .delete(protect, admin, removeCache, deleteProductById)
  .put(protect, admin, removeCache, updateProduct);
productRouter
  .route("/:id/reviews")
  .post(protect, removeCache, createProductReview);

export default productRouter;
