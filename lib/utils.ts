import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Map the array of objects to unified structure
export const mapToUnifiedObjects = <T extends Record<string, any>, U>(
  input: T[],
  targetKeys: (keyof U)[]
): U[] => {
  return input.map((obj) => {
    const values = Object.values(obj);
    const unifiedObj: Partial<U> = {};
    targetKeys.forEach((key, index) => {
      unifiedObj[key as keyof U] = values[index];
    });
    return unifiedObj as U;
  });
};
