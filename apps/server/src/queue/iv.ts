import { Queue } from "bullmq";
import { redisImQueueConnection } from "../lib/redis";

export const ivQueue = new Queue("iv", {
  connection: redisImQueueConnection,
});

export const ivQueueAdd = async (id: string) => {
  if (!ivQueue) {
    throw new Error("Image verification queue not initialized");
  }
  ivQueue.add(
    `iv-${id}`,
    {
      id: id,
    },
    {
      attempts: 3,
      backoff: {
        delay: 5 * 1000,
        type: "fixed",
      },
    }
  );
};
