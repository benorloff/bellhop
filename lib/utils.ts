import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function unitPriceToDollars(unitPrice: bigint) {
  return (
    `$${Number(BigInt(unitPrice)) / 100}`
  )
}