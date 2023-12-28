import asyncHandler from "express-async-handler";
import redisClient from "../redisClient.js";

export const Cache = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await redisClient.get(id);
    if (data !== null) {
      console.log("Cache hit:");
      res.status(200).send(JSON.parse(data));
    } else {
      console.log("Cache miss");
      next();
    }
  } catch (error) {
    next(error);
  }
});
