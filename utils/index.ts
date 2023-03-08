export const trimChars = (body: string) => {
  return body.replace(/[\t|\n]/g, "").replace(/  /g, "");
};

type ValueOf<T> = T[keyof T];
type Entries<T> = Array<[keyof T, ValueOf<T>]>;

export function ObjectEntries<T extends object>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}

export function generateRandomString(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function isObjectID(str: string) {
  return /^[0-9a-fA-F]{24}$/.test(str);
}
