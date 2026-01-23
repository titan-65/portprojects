import { createError, defineEventHandler, getRouterParam } from "nitro/h3";

import { getMenuItemById } from "../../db/menu";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Menu item id is required." });
  }

  const item = await getMenuItemById(id);

  if (!item) {
    throw createError({ statusCode: 404, statusMessage: "Menu item not found." });
  }

  return { item };
});
