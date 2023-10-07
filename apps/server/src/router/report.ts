import { prisma } from "@/lib/prisma";
import { publicProcedure, router } from "@/lib/trpc";
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
      const data = await prisma.test.findMany();

      await prisma.report.create({
        data: {
          latitude: input.location.latitude,
          longitude: input.location.longitude,
          image: input.image,
        },
      });

      return data;
    }),
});

export default reportRouter;
