import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

//@desc    create order
//@api     POST /api/order
//@access  private
export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(404);
    throw new Error("No Order Item");
    return;
  } else {
    const orderDetail = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });

    const order = await orderDetail.save();

    res.status(201).json(order);
  }
});

//@desc    Get order by ID
//@api     GET /api/order
//@access  private
export const getOrderById = asyncHandler(async (req, res) => {
  const foundOrder = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (foundOrder) {
    res.status(200).send(foundOrder);
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

//@desc    Update order to Paid
//@api     PUT /api/:id/pay
//@access  private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const foundOrder = await Order.findById(req.params.id);
  if (foundOrder) {
    foundOrder.isPaid = true;
    foundOrder.paidAt = Date.now();
    foundOrder.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_aaddress: req.body.email_aaddress,
    };

    const updateOrder = await foundOrder.save();
    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

//@desc    Get my orders list
//@api     GET /api/orders
//@access  private
export const getMyOrdersList = asyncHandler(async (req, res) => {
  const myOrders = await Order.find({user : req.user._id});
  res.send(myOrders)
});