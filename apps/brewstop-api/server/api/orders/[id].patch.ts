import { createError, defineEventHandler, getRouterParam, readBody } from "nitro/h3";

import { getOrderById, updateOrderStatus } from "../../db/orders";
import type { Order } from "../../data/orders";

interface UpdateOrderBody {
  status?: Order["status"];
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Order id is required." });
  }

  const body = (await readBody<UpdateOrderBody>(event)) ?? {};

  if (!body.status) {
    throw createError({ statusCode: 400, statusMessage: "Order status is required." });
  }

  const existing = await getOrderById(id);

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: "Order not found." });
  }

  const order = await updateOrderStatus(id, body.status);

  return { order };
});
