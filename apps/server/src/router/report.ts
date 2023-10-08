import { prisma } from "../lib/prisma";
import { publicProcedure, router } from "../lib/trpc";
// import { ivQueueAdd } from "../queue/iv";
import { z } from "zod";
import { getBoundsOfDistance } from "geolib";
import { ivSendImage } from "../lib/ivfetch";

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

      // ivQueueAdd(onDb.id.toString());

      let ivResp = false;
      try {
        ivResp = (await ivSendImage(onDb.image)) ? true : false;
      } catch (error) {
        console.error("Error:", error);
      }
      console.log("ivResp", ivResp);

      const updatedOnDb = await prisma.report.update({
        where: {
          id: onDb.id,
        },
        data: {
          status: ivResp ? "APPROVED" : "REJECTED",
        },
      });

      return updatedOnDb;
    }),
  all: publicProcedure
    .input(
      z
        .object({
          longitude: z.number(),
          latitude: z.number(),
          radius: z.number(),
        })
        .nullish()
    )
    .query(async ({ input }) => {
      const getFilterQuery = () => {
        if (!input) {
          return null;
        }

        const bounds = getBoundsOfDistance(
          { latitude: input.latitude, longitude: input.longitude },
          input.radius * 1000 // radius is converted from km to meters as getBoundsOfDistance expects meters
        );

        return {
          latitude: {
            gte: bounds[0].latitude,
            lte: bounds[1].latitude,
          },
          longitude: {
            gte: bounds[0].longitude,
            lte: bounds[1].longitude,
          },
        };
      };

      const data = await prisma.report.findMany({
        where: {
          status: "APPROVED",
          // OR: [
          //   {},
          //   // {
          //   //   status: "REJECTED",
          //   // },
          //   // {
          //   //   status: "PENDING",
          //   // },
          // ],
          ...getFilterQuery(),
        },
        select: {
          id: true,
          latitude: true,
          longitude: true,
          status: true,
          timestamp: true,
        },
      });

      return data;
    }),
});

export default reportRouter;
