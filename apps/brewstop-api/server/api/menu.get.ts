import { defineEventHandler } from "nitro/h3";

import { listMenuItems } from "../db/menu";

export default defineEventHandler(async () => {
  const items = await listMenuItems();

  return { items };
});
