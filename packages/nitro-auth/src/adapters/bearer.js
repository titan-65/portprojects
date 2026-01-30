import { getHeader } from "h3";
export const bearerAdapter = {
    name: "bearer",
    authenticate: (event, config) => {
        const authHeader = getHeader(event, "authorization") ?? "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";
        const allowed = config.bearerTokens ?? [];
        if (!allowed.length) {
            return { ok: false, reason: "No bearer tokens configured." };
        }
        return {
            ok: Boolean(token) && allowed.includes(token),
            reason: "Invalid bearer token.",
        };
    },
};
