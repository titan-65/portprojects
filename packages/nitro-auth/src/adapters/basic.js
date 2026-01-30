import { getHeader } from "h3";
export const basicAdapter = {
    name: "basic",
    authenticate: (event, config) => {
        const authHeader = getHeader(event, "authorization") ?? "";
        const raw = authHeader.startsWith("Basic ") ? authHeader.slice(6).trim() : "";
        if (!raw) {
            return { ok: false, reason: "Missing basic auth header." };
        }
        const decoded = Buffer.from(raw, "base64").toString("utf-8");
        const [username, password] = decoded.split(":");
        const credentials = config.basicAuth;
        if (!credentials) {
            return { ok: false, reason: "No basic auth credentials configured." };
        }
        return {
            ok: username === credentials.username && password === credentials.password,
            reason: "Invalid basic auth credentials.",
        };
    },
};
