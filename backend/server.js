import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRoutes.js";

const app = express();
dotenv.config();

connectdb();

app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

app.use("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const _dirname = path.resolve();
app.use("/uploads", express.static(path.join(_dirname, "/uploads")));

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(_dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"))
  );
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server started running on ${PORT} in ${process.env.NODE_ENV} mode`
  )
);
