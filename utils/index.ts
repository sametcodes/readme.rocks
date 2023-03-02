export const trimChars = (body: string) => {
  return body.replace(/[\t|\n]/g, "").replace(/  /g, "");
};

type ValueOf<T> = T[keyof T];
type Entries<T> = [keyof T, ValueOf<T>][];

export function ObjectEntries<T extends object>(obj: T): Entries<T> {
  return Object.entries(obj) as Entries<T>;
}
