import { ivSendImage } from "@/lib/ivfetch";
import { prisma } from "@/lib/prisma";
import { redisImQueueConnection } from "@/lib/redis";
import { Worker } from "bullmq";

export const ivWorker = new Worker(
  "iv",
  async (job) => {
    // Will print { foo: 'bar'} for the first job
    // and { qux: 'baz' } for the second.

    const jobOnDb = await prisma.report.findUnique({
      where: {
        id: parseInt(job.data.id),
      },
    });
    if (!jobOnDb) {
      throw new Error("Job not found");
    }

    // const randBoolStillPending = Math.random() >= 0.5;
    // if (randBoolStillPending) {
    //   throw new Error("ivJob still pending");
    // }

    const ivResp = await ivSendImage(jobOnDb.image);
    if (ivResp === undefined) {
      throw new Error("ivResp is undefined");
    }

    console.log("ivResp", ivResp);

    const randBool = Math.random() >= 0.5;
    const status = ivResp ? "APPROVED" : "REJECTED";

    const newDataOnDb = await prisma.report.update({
      where: {
        id: parseInt(job.data.id),
      },
      data: {
        status: status,
      },
    });

    console.log(newDataOnDb);
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
