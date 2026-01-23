import { defineEventHandler } from "nitro/h3";

import { seedDatabase } from "../db/seed";

export default defineEventHandler(async () => {
  const result = await seedDatabase();

  return {
    seeded: true,
    ...result,
  };
});
