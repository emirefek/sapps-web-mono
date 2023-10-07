import { z } from "zod";
import { publicProcedure, router } from "@/lib/trpc";
import demoRouter from "./router/demo";
import reportRouter from "./router/report";
import stationRouter from "./router/station";

const helloRouter = router({
  greeting: publicProcedure
    .input(z.object({ name: z.string() }).nullish())
    .query(({ input }) => {
      return `Hello ${input?.name ?? "World"}`;
    }),
});

export const appRouter = router({
  hello: helloRouter,
  demo: demoRouter,
  report: reportRouter,
  station: stationRouter,
});

export type AppRouter = typeof appRouter;
