import redis from "redis";
import dotenv from "dotenv";

dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

redisClient.on("error", (err) => {
  console.error(`Redis client error: ${err}`);
});

redisClient.on("ready", () => {
  console.log(`Redis is ready : ${REDIS_PORT}`);
});

redisClient.on("end", () => {
  console.log("Redis connection ended");
});

process.on("SIGINT", () => {
  redisClient.quit();
});

export default redisClient;
