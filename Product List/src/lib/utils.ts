import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Product } from "@/types/Product";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
