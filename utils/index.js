"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQueryString =
  exports.objectToQueryString =
  exports.cn =
  exports.isObjectID =
  exports.generateRandomString =
  exports.ObjectEntries =
  exports.trimChars =
    void 0;
const clsx_1 = require("clsx");
const tailwind_merge_1 = require("tailwind-merge");
const trimChars = (body) => {
  return body.replace(/[\t|\n]/g, "").replace(/  /g, "");
};
exports.trimChars = trimChars;
function ObjectEntries(obj) {
  return Object.entries(obj);
}
exports.ObjectEntries = ObjectEntries;
function generateRandomString() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
exports.generateRandomString = generateRandomString;
function isObjectID(str) {
  return /^[0-9a-fA-F]{24}$/.test(str);
}
exports.isObjectID = isObjectID;
function cn(...inputs) {
  return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.cn = cn;
function objectToQueryString(obj, prefix) {
  const pairs = [];
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    const value = obj[key];
    const newKey = prefix ? `${prefix}[${key}]` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      pairs.push(...objectToQueryString(value, newKey).split("&"));
    } else {
      pairs.push(
        encodeURIComponent(newKey) + "=" + encodeURIComponent(String(value))
      );
    }
  }
  return pairs.filter(Boolean).join("&");
}
exports.objectToQueryString = objectToQueryString;
function parseQueryString(queryString) {
  const pairs = queryString.split("&");
  const result = {};
  pairs.forEach((pair) => {
    const [key, value] = pair.split("=").map(decodeURIComponent);
    const keys = key.split(/\]\[|\[|\]/).filter((k) => k);
    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
      const keyPart = keys[i];
      if (!current[keyPart]) {
        current[keyPart] = {};
      }
      current = current[keyPart];
    }
    current[keys[keys.length - 1]] = value;
  });
  return result;
}
exports.parseQueryString = parseQueryString;
