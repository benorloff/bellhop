import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function unitPriceToDollars(unitPrice: number) {
  return (
    `$${Number(unitPrice) / 100}`
  )
}

export function timeElapsed(date: Date) {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  let interval = seconds / 31536000
  if (interval > 1) {
    return `${Math.floor(interval)} years`
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return `${Math.floor(interval)} months`
  }
  interval = seconds / 86400
  if (interval > 1) {
    return `${Math.floor(interval)} days`
  }
  interval = seconds / 3600
  if (interval > 1) {
    return `${Math.floor(interval)} hours`
  }
  interval = seconds / 60
  if (interval > 1) {
    return `${Math.floor(interval)} minutes`
  }
  return `${Math.floor(seconds)} seconds`
}