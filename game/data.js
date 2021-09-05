import {readFileSync, writeFileSync} from "fs";

export function userData(data) {
  if (!data) return JSON.parse(readFileSync("./store.json", "utf8"));
  else return writeFileSync("./store.json", JSON.stringify(data));
}

export function resetData() {
  const data = {
    saved: [],
    stats: {
      wins: 0,
      loses: 0,
      ties: 0
    }
  };
  userData(data);
  return data;
}