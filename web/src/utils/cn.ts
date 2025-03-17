import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// eslint-disable-next-line
export const cn = (...classes: ClassValue[]): string => twMerge(clsx(classes));
