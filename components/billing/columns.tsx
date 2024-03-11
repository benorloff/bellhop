"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { redirect } from "next/navigation";
import Link from "next/link";
import Stripe from "stripe";
import { unitPriceToDollars } from "@/lib/utils";


export const columns: ColumnDef<Stripe.Invoice>[] =[
    {
        accessorKey: "number",
        header: "Invoice",
        cell: ({ row }) => (
            <div>
                {`Invoice #${row.original.number}`}
            </div>
        ),
    },
    {
        accessorKey: "period_start",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="pl-0"
            >
                Date
                <ArrowUpDown 
                    size={16} 
                    className="ml-2"
                />
            </Button>
        ),
        cell: ({ row }) => (
            <div>
                {new Date(row.original.period_start * 1000).toLocaleDateString("en-US", { 
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}
            </div>
        )
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="pl-0"
            >
                Status
                <ArrowUpDown 
                    size={16} 
                    className="ml-2"
                />
            </Button>
        ),
        cell: ({ row }) => (
            <Badge
                className="w-[75px] justify-center rounded-full"
                variant={row.original.status as "draft" | "open" | "paid" | "uncollectible" | "void"}
            >
                {`${row.original.status!.charAt(0).toUpperCase()}${row.original.status!.slice(1)}`}
            </Badge>
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        }
    },
    {
        accessorKey: "total",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="pl-0"
            >
                Total
                <ArrowUpDown 
                    size={16} 
                    className="ml-2"
                />
            </Button>
        ),
        cell: ({ row }) => (
            <div>
                {unitPriceToDollars(row.original.total)}
            </div>
        )
    },
    {
        accessorKey: "invoice_pdf",
        header: "Download",
        cell: ({ row }) => (
            <Link href={row.original.invoice_pdf!} passHref>
                <Button>
                    <Download size={16} />
                </Button>
            </Link>
        )
    },
]