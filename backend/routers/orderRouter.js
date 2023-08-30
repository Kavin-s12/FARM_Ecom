import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrdersList
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.route("/myorders").get(protect, getMyOrdersList);
orderRouter.route("/:id").get(protect, getOrderById);
orderRouter.route("/").post(protect, createOrder);
orderRouter.route("/:id/pay").put(protect, updateOrderToPaid);


export default orderRouter;
