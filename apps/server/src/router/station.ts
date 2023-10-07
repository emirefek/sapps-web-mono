import { StationAvg } from "@/class/StationAvg";
import { prisma } from "@/lib/prisma";
import { publicProcedure, router } from "@/lib/trpc";
import { z } from "zod";

const stationRouter = router({
  dataAdd: publicProcedure
    .input(
      z.object({
        station_id: z.number(),
        temp: z.number(),
        humidity: z.number(),
        airq: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const onDb = await prisma.stationData.create({
        data: {
          stationId: input.station_id,
          temp: input.temp,
          humidity: input.humidity,
          airq: input.airq,
        },
      });

      return onDb;
    }),
  getAvg: publicProcedure
    .input(
      z.object({
        station_id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const avger = new StationAvg();
      const data = await avger.getAvg(input.station_id.toString());

      return {
        temp: data.temp.toFixed(2),
        humidity: data.humidity.toFixed(2),
        airq: data.airq.toFixed(2),
      };
    }),
});

export default stationRouter;
