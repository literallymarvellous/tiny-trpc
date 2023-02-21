export type Procedures = {
  [Method: string]: (...args: any[]) => any;
};

export type Context = {
  [K: string]: unknown;
};

export type Request = {
  version: string;
  id: string;
  method: string;
  params?: unknown[];
  context?: Context;
};

export type RequestHandler = (request: Request) => Promise<Response>;
export type ResponseHandler = (respone: Response) => void;

export type ResponseSuccess = {
  version: string;
  id: string;
  result: unknown;
};

export type ResponseError = {
  version: string;
  id: string;
  error: {
    code: number;
    message: string;
    data?: unknown;
  };
};

export type Response = ResponseSuccess | ResponseError;

export type HttpServerOptions = {
  port: number;
  procedures: Procedures;
  serializer?: (data: any) => string;
  deserializer?: (data: string) => any;
};

export type HttpServer = AbstractServer & {
  close: () => void;
};

export type AbstractServerOptions = {
  procedures: Procedures;
  handler: ResponseHandler;
};

export type AbstractServer = {
  handle: (request: Request) => Promise<Response>;
};

export type MemoryServerOptions = {
  procedures: Procedures;
};

export type MemoryServer = AbstractServer;
