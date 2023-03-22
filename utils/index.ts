import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

interface Dictionary<T> {
  [key: string]: T;
}

export function objectToQueryString(obj: Dictionary<unknown>, prefix?: string) {
  const pairs: string[] = [];

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];
    const newKey = prefix ? `${prefix}[${key}]` : key;

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      pairs.push(
        ...objectToQueryString(value as Dictionary<unknown>, newKey).split("&")
      );
    } else {
      pairs.push(
        encodeURIComponent(newKey) + "=" + encodeURIComponent(String(value))
      );
    }
  }

  return pairs.filter(Boolean).join("&");
}

export function parseQueryString(queryString: string): Dictionary<unknown> {
  const pairs = queryString.split("&");
  const result: Dictionary<unknown> = {};

  pairs.forEach((pair) => {
    const [key, value] = pair.split("=").map(decodeURIComponent);
    const keys = key.split(/\]\[|\[|\]/).filter((k) => k);

    let current: Dictionary<unknown> = result;
    for (let i = 0; i < keys.length - 1; i++) {
      const keyPart = keys[i];
      if (!current[keyPart]) {
        current[keyPart] = {};
      }
      current = current[keyPart] as Dictionary<unknown>;
    }

    current[keys[keys.length - 1]] = value;
  });

  return result;
}
