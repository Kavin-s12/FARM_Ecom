import express from "express";
import {
  getProducts,
  getProductById,
  deleteProductById,
  updateProduct,
  createProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

productRouter.route("/").get(getProducts).post(protect, admin, createProduct);
productRouter
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProductById)
  .put(protect, admin, updateProduct);

export default productRouter;
