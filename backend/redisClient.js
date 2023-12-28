import redis from "redis";
import dotenv from "dotenv";

dotenv.config();

const REDIS_URL = process.env.REDIS_URL || 6379;

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error(`Redis client error: ${err}`);
});

redisClient.on("ready", () => {
  console.log(`Redis is ready : ${REDIS_URL}`);
});

redisClient.on("end", () => {
  console.log("Redis connection ended");
});

process.on("SIGINT", () => {
  redisClient.quit();
});

export default redisClient;
