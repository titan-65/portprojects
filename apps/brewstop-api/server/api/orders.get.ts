import { defineEventHandler } from "nitro/h3";

import { listOrders } from "../db/orders";

export default defineEventHandler(async () => {
  const orders = await listOrders();

  return { orders };
});
