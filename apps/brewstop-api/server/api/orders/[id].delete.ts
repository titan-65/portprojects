import { createError, defineEventHandler, getRouterParam } from "nitro/h3";

import { deleteOrder, getOrderById } from "../../db/orders";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Order id is required." });
  }

  const order = await getOrderById(id);

  if (!order) {
    throw createError({ statusCode: 404, statusMessage: "Order not found." });
  }

  await deleteOrder(id);

  return { deleted: true };
});
