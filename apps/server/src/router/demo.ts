import { prisma } from "../lib/prisma";
import { publicProcedure, router } from "../lib/trpc";

const demoRouter = router({
  get: publicProcedure.query(async () => {
    const data = await prisma.test.findMany();
    return data;
  }),
});

export default demoRouter;
