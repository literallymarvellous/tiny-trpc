import { createHttpServer } from "./server/http";

const Procedures = {
  sum(a: number, b: number) {
    // This procedure is a simple pure function that doesn't use the context
    return a + b;
  },
  throw() {
    // This procedure throws, with a custom error code and data value
    const error = new Error("Some custom error");
    throw error;
  },
};

const server = createHttpServer({
  port: 6000,
  procedures: Procedures,
});
