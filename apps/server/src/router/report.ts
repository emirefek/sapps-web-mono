import { prisma } from "@/lib/prisma";
import { publicProcedure, router } from "@/lib/trpc";
import { ivQueueAdd } from "@/queue/iv";
import { z } from "zod";

const reportRouter = router({
  new: publicProcedure
    .input(
      z.object({
        location: z.object({
          longitude: z.number(),
          latitude: z.number(),
        }),
        image: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const onDb = await prisma.report.create({
        data: {
          latitude: input.location.latitude,
          longitude: input.location.longitude,
          image: input.image,
        },
      });

      ivQueueAdd(onDb.id.toString());

      return onDb;
    }),
  all: publicProcedure.query(async () => {
    const data = await prisma.report.findMany({
      where: {
        OR: [
          {
            status: "APPROVED",
          },
          {
            status: "REJECTED",
          },
          {
            status: "PENDING",
          },
        ],
      },
    });

    console.log(data);

    return data;
  }),
});

export default reportRouter;
