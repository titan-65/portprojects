import { defineEventHandler } from "nitro/h3";
import { useRuntimeConfig } from "nitro/runtime-config";

export default defineEventHandler(() => {
  const config = useRuntimeConfig();

  return { name: config.public.truckName };
});
