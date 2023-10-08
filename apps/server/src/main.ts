import path from "path";
import dotenv from "dotenv";

const envPath = path.join(__dirname, "../../.." + "/.env");
dotenv.config({
  path: envPath,
});

import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import { appRouter } from "./router";
import cors from "cors";
import { renderTrpcPanel } from "trpc-panel";
import { redisImQueueConnection } from "./lib/redis";
import { ivQueue } from "./queue/iv";
import { ivWorker } from "./queue/ivWorker";

async function main() {
  // express implementation
  const app = express();

  app.use(
    cors({
      origin: "*",
    })
  );

  // use cors using cors package for express

  // For testing purposes, wait-on requests '/'
  app.get("/", (_req, res) => res.send("Server is running!"));

  app.use(
    "/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext: () => ({}),
    })
  );

  app.use("/panel", (_, res) => {
    return res.send(
      renderTrpcPanel(appRouter, { url: "http://localhost:3000/trpc" })
    );
  });

  app.listen(3000);
  console.log("🚀 Server ready at http://localhost:3000");
  console.log("DEMO: ", process.env.DEMO);

  const redisCon = redisImQueueConnection;
  console.log(await redisCon.hello());
  redisCon.flushall();
  console.log("ivQueue jobs", (await ivQueue.getJobs()).length);
  console.log("ivWorker", (await ivWorker.client).status);
}

void main();
