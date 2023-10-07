import IORedis from "ioredis";

const connectionString = process.env.REDIS_URL_IMQUEUE;
console.log("REDIS_URL_IMQUEUE", connectionString);
if (!connectionString) {
  throw new Error("Missing REDIS_URL_IMQUEUE environment variable");
}
const [, username, password, host, port] =
  connectionString?.match(/rediss:\/\/(.*):(.*)@(.*):(.*)/i) || [];
if (!host || !port || !username || !password) {
  throw new Error("Invalid redis connection string");
}

export const redisImQueueConnection = new IORedis(connectionString);
