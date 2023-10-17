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

const productRouter = express.Router();

productRouter.route("/").get(getProducts).post(protect, admin, createProduct);
productRouter.route("/topreview").get(getTopReviewProduct);
productRouter
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProductById)
  .put(protect, admin, updateProduct);
productRouter.route("/:id/reviews").post(protect, createProductReview);

export default productRouter;
