import { atom } from "recoil";

export const isClient = atom({
  key: "isClient",
  default: false,
});
export const isSubClient = atom({
  key: "isSubClient",
  default: false,
});
