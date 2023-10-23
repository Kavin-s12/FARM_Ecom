import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrdersList,
  getOrdersList,
  updateOrderToDelivered,
} from "../controllers/orderController.js";

const orderRouter = express.Router();
orderRouter.route("/:id/pay").put(protect, updateOrderToPaid);
orderRouter.route("/:id/delivered").put(protect, admin, updateOrderToDelivered);

orderRouter.route("/myorders").get(protect, getMyOrdersList);
orderRouter.route("/:id").get(protect, getOrderById);
orderRouter
  .route("/")
  .post(protect, createOrder)
  .get(protect, admin, getOrdersList);

export default orderRouter;
