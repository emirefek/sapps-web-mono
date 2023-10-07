import { redisImQueueConnection } from "@/lib/redis";
import { Worker } from "bullmq";

export const ivWorker = new Worker(
  "iv",
  async (job) => {
    // Will print { foo: 'bar'} for the first job
    // and { qux: 'baz' } for the second.
    console.log(job.data);
  },
  {
    connection: redisImQueueConnection,
  }
);

ivWorker.on("completed", (job) => {
  console.log(`${job.id} has completed!`);
});

ivWorker.on("failed", (job, err) => {
  console.log(`${job ? job.id : "UnknownJob"} has failed with ${err.message}`);
});
