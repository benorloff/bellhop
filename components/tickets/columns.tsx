"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../ui/badge";

import { TICKET_STATUS } from "@/constants/tickets";

export type Ticket = {
    id: number;
    subject: string;
    description: string;
    status: number;
    priority: number;
    type: number;
    created_at: string;
    updated_at: string;
    from_email?: string;
    to_emails?: string[];
    cc_emails?: string[];
    bcc_emails?: string[];
    attachments?: [];
    last_edited_at?: string;
    last_edited_user_id?: number;
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
                variant="default"
                className="bg-status-open text-green-800"
            >
                {TICKET_STATUS[row.original.status as keyof typeof TICKET_STATUS]}
            </Badge>
        )
    },
    {
        accessorKey: "subject",
        header: "Subject",
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
    },
]