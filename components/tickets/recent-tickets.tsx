import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { 
    zendeskApiHost,
    zendeskApiPassword,
    zendeskApiUsername,
 } from "@/constants/tickets";
import { Skeleton } from "../ui/skeleton";

interface RecentTicketsProps {
    requestType: "site" | "user";
    siteId?: string;
    zendeskUserId?: string;
};

const getTickets = async ({
    requestType,
    siteId,
    zendeskUserId,
}: RecentTicketsProps) => {

    let tickets;

    // Fetch all Zendesk tickets associated with the SITE'S ID
    if (requestType === "site") {
        const query = new URLSearchParams({
            query: `type:ticket custom_field_23229752282907:${siteId}`,
            sort_by: "updated_at",
            sort_order: "desc",
        });
        try {
            const res = await fetch(`${zendeskApiHost}/search?${query}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${zendeskApiUsername}:${zendeskApiPassword}`)}`,
                },
                next: {
                    tags: ['tickets'],
                }, 
            });
            tickets = await res.json();
        } catch (error) {
            return {
                error: "Failed to get site tickets."
            };
        };
    };

    // Fetch all Zendesk tickets requested by the USER'S ID
    if (requestType === "user") {
        try {
            const res = await fetch(`${zendeskApiHost}/users/${zendeskUserId}/tickets/requested?sort_by=updated_at&sort_order=desc`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${zendeskApiUsername}:${zendeskApiPassword}`)}`,
                },
                next: {
                    tags: ['tickets'],
                },
            });
            tickets = await res.json();
        } catch (error) {
            return {
                error: "Failed to get user tickets."
            };
        };
    };

    return tickets;
};

export const RecentTickets = async ({
    requestType,
    siteId,
    zendeskUserId,
}: RecentTicketsProps) => {

    const tickets = await getTickets({
        requestType,
        siteId,
        zendeskUserId,
    });

    // If no tickets are found, return a message
    if (tickets.count === 0) {
        return (
            <p>No tickets yet.</p>
        )
    };

    // Return the 3 most recent tickets
    return (
        <>
            {tickets.results.map((ticket: any, index: number) => {
                if ( index < 3 ) {
                    return (
                        <Link href={`/tickets/${ticket.id}`} key={ticket.id}>
                            <div className="flex flex-row gap-4 justify-between border rounded-sm bg-background hover:bg-background/90 p-4 mb-4">
                                <Badge variant="open">{`${ticket.status.charAt(0).toUpperCase()}${ticket.status.slice(1)}`}</Badge>
                                <div className="grow">{ticket.subject}</div>
                                <div className="shrink">{new Date(ticket.updated_at).toLocaleString()}</div>
                            </div>
                        </Link>
                    )
                }
            })}     
        </>
    )
};

RecentTickets.Skeleton = function SkeletonRecentTickets() {
    return (
        <>
            <div className="flex flex-row gap-4 justify-between border rounded-sm p-4 mb-4">
                <Skeleton className="h-6 w-[50px]" />
                <Skeleton className="h-6 grow" />
                <Skeleton className="h-6 w-[150px]" />
            </div>
            <div className="flex flex-row gap-4 justify-between border rounded-sm p-4 mb-4">
                <Skeleton className="h-6 w-[50px]" />
                <Skeleton className="h-6 grow" />
                <Skeleton className="h-6 w-[150px]" />
            </div>
            <div className="flex flex-row gap-4 justify-between border rounded-sm p-4 mb-4">
                <Skeleton className="h-6 w-[50px]" />
                <Skeleton className="h-6 grow" />
                <Skeleton className="h-6 w-[150px]" />
            </div>
        </>
        
    )
}