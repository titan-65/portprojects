import { defineEventHandler, getRequestHeader, setResponseHeader, setResponseStatus, send } from "h3";

export default defineEventHandler((event) => {
  const origin = getRequestHeader(event, "origin") ?? "*";

  setResponseHeader(event, "Access-Control-Allow-Origin", origin);
  setResponseHeader(event, "Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  setResponseHeader(event, "Access-Control-Allow-Headers", "Content-Type, Authorization, X-API-KEY");
  setResponseHeader(event, "Access-Control-Allow-Credentials", "true");

  if (event.method === "OPTIONS") {
    setResponseStatus(event, 204);
    return send(event, "");
  }
});
