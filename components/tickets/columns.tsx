"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../ui/badge";

import { redirect } from "next/navigation";
import Link from "next/link";

export type Ticket = {
    id: number;
    url: string;
    subject: string;
    description: string;
    status: string;
    requester_id: number;
    submitter_id: number;
    organization_id: number;
    created_at: string;
    updated_at: string;
}

export const columns: ColumnDef<Ticket>[] =[
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
                variant={row.original.status as "open" | "pending" | "solved"}
                className="w-[75px] justify-center"
            >
                {/* Capitalize first letter of status */}
                {`${row.original.status.charAt(0).toUpperCase()}${row.original.status.slice(1)}`}
            </Badge>
        )
    },
    {
        accessorKey: "subject",
        header: "Subject",
        cell: ({ row }) => (
            <Link
                href={`/tickets/${row.original.id}`}
            >
                {row.original.subject}
            </Link>
        )
    },
    {
        accessorKey: "updated_at",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="pl-0"
            >
                Last Updated
                <ArrowUpDown 
                    size={16} 
                    className="ml-2"
                />
            </Button>
        ),
        cell: ({ row }) => (
            <div>
                {new Date(row.original.updated_at).toLocaleString("en-US", { 
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    timeZoneName: "short",
                })}
            </div>
        )
    },
]