import { MemoryServer, Procedures } from "../types";
import { noop } from "../utils";
import { createAbstractServer } from "./abstract";

interface MemoryServerOptions {
  procedures: Procedures;
}

export const createMemoryServer = (
  options: MemoryServerOptions
): MemoryServer => {
  const { procedures } = options;

  return createAbstractServer({
    procedures,
    handler: noop,
  });
};
