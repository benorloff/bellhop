import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-default",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Custom variants for ticket status badges
        open:
          "border-transparent bg-status-open text-status-open-foreground hover:bg-status-open/80",
        pending:
          "border-transparent bg-status-pending text-status-pending-foreground hover:bg-status-pending/80",
        solved:
          "border-transparent bg-status-solved text-status-solved-foreground hover:bg-status-solved/80",
        paid:
          "border-transparent bg-status-paid text-status-paid-foreground hover:bg-status-paid/80",
        draft:
          "border-transparent bg-status-draft text-status-draft-foreground hover:bg-status-draft/80",
        void:
          "border-transparent bg-status-void text-status-void-foreground hover:bg-status-void/80",
        uncollectible:
          "border-transparent bg-status-uncollectible text-status-uncollectible-foreground hover:bg-status-uncollectible/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
