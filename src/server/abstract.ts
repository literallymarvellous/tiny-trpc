import { z } from "zod";
import {
  AbstractServer,
  AbstractServerOptions,
  Request,
  Response,
} from "../types";

export const createAbstractServer = (
  opts: AbstractServerOptions
): AbstractServer => {
  const { procedures, handler } = opts;

  return {
    handle: async (req: Request): Promise<Response> => {
      let reqSchema = z.object({
        version: z.string(),
        id: z.string(),
        method: z.string(),
        params: z.unknown().array().optional(),
        context: z.record(z.unknown()).optional(),
      });

      const result = reqSchema.safeParse(req);

      if (!result.success) {
        return {
          id: req.id,
          version: req.version,
          error: {
            code: 1,
            message: result.error.message,
          },
        };
      }

      try {
        const id = req.id;
        const method = req.method;
        const params = req.params || [];
        const context = req.context;
        const result = await procedures[method].apply(context, params);

        return { id, version: req.version, result };
      } catch (error) {
        return {
          id: req.id,
          version: req.version,
          error: {
            code: 2,
            message: JSON.stringify(error),
          },
        };
      }
    },
  };
};
