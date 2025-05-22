import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDeepValue = (
  obj: any,
  path: string[] | string,
  defaultValue?: string
) => {
  if (typeof path === "string") path = path.split(".") as string[];

  let newObj = obj[path[0]];

  for (let i = 1; i <= path.length - 1; i++) {
    if (newObj == null || !(path[i] in newObj)) {
      return defaultValue || "invalid path";
    }
    newObj = newObj[path[i]];
  }
  return newObj;
};


