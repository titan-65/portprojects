import { defineEventHandler, getRequestHeader, send } from "h3";

export default defineEventHandler((event) => {
  const origin = getRequestHeader(event, "origin") ?? "*";

  event.node.res.setHeader("Access-Control-Allow-Origin", origin);
  event.node.res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  event.node.res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-API-KEY");
  event.node.res.setHeader("Access-Control-Allow-Credentials", "true");

  if (event.method === "OPTIONS") {
    event.node.res.statusCode = 204;
    return send(event, "");
  }
});
