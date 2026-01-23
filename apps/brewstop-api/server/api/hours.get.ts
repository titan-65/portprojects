import { createError, defineEventHandler } from "nitro/h3";

import { getHours } from "../db/hours";

export default defineEventHandler(async () => {
  const hours = await getHours();

  if (!hours) {
    throw createError({ statusCode: 404, statusMessage: "Hours not seeded." });
  }

  return hours;
});
