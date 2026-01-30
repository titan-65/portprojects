import { getHeader } from "h3";
export const apiKeyAdapter = {
    name: "apiKey",
    authenticate: (event, config) => {
        const apiKey = getHeader(event, "x-api-key") ?? "";
        const allowed = config.apiKeys ?? [];
        if (!allowed.length) {
            return { ok: false, reason: "No API keys configured." };
        }
        return {
            ok: allowed.includes(apiKey),
            reason: "Invalid API key.",
        };
    },
};
