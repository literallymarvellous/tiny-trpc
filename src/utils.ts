export const attempt = <T, U>(fn: () => T, fallback: U): T | U => {
  try {
    return fn();
  } catch {
    return fallback;
  }
};

export const deserialize = (value: string): any => {
  return JSON.parse(value);
};

export const serialize = (value: unknown): string => {
  return JSON.stringify(value);
};

export const noop = (): void => {
  return;
};
