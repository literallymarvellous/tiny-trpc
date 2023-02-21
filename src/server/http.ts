import http from "node:http";
import { attempt, deserialize, serialize } from "../utils";
import { createMemoryServer } from "./memory";
import { HttpServerOptions, HttpServer } from "../types";

export const createHttpServer = (opts: HttpServerOptions): HttpServer => {
  const { port, procedures } = opts;
  const serializer = opts.serializer || serialize;
  const deserializer = opts.deserializer || deserialize;

  const memoryServer = createMemoryServer({ procedures });

  const httpServer = http.createServer((req, res) => {
    const chunks: Buffer[] = [];

    req.on("data", (chunk) => {
      chunks.push(chunk);
    });
    req.on("end", () => {
      const body = Buffer.concat(chunks).toString();
      const request = attempt(() => deserializer(body), {});
      const response = memoryServer.handle(request);
      const responseSerialized = serializer(response);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(responseSerialized);
      res.end();
    });
  });

  httpServer.listen(port);

  return {
    ...memoryServer,
    close: () => {
      httpServer.close();
    },
  };
};
