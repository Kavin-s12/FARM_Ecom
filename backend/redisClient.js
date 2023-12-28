import redis from "redis";

const REDISPORT = process.env.REDISPORT || 6379;

const redisClient = redis.createClient(REDISPORT);

redisClient.on("error", (err) => {
  console.error(`Redis client error: ${err}`);
});

redisClient.on("ready", () => {
  console.log("Redis is ready");
});

redisClient.on("end", () => {
  console.log("Redis connection ended");
});

process.on("SIGINT", () => {
  redisClient.quit();
});

export default redisClient;
