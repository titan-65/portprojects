import { createError, defineEventHandler, readBody } from "nitro/h3";

import { createOrder } from "../db/orders";
import type { Order, OrderItem } from "../data/orders";

interface CreateOrderBody {
  items?: OrderItem[];
  total?: number;
  status?: Order["status"];
}

export default defineEventHandler(async (event) => {
  const body = (await readBody<CreateOrderBody>(event)) ?? {};
  const items = body.items ?? [];
  const total = body.total ?? 0;

  if (!Array.isArray(items) || items.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Order must include at least one item.",
    });
  }

  if (typeof total !== "number" || total <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Order total must be greater than 0.",
    });
  }

  const order: Order = await createOrder({
    items,
    total,
    status: body.status ?? "pending",
  });

  return { order };
});
