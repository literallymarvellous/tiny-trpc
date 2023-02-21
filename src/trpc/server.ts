import { initTRPC } from "@trpc/server";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;
