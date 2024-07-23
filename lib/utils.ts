import { type ClassValue, clsx } from "clsx";
import { Context, useContext } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createUseEnsureContext = <S>(
  ctx: Context<S | null>,
): (() => S) => {
  return () => {
    const contextMaybe = useContext(ctx);
    if (!contextMaybe) {
      throw new Error("useContext without Provider");
    }
    return contextMaybe;
  };
};
