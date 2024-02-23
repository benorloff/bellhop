"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";


import { InputType, ReturnType } from "./types";
import { CreateTicket } from "./schema";

import { requestUrl } from "@/constants/tickets";

// Zendesk Requests API Reference
// https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-requests/#create-request

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
    };

    const user = await currentUser();

    if (!user) {
        return {
            error: "User not found",
        };
    }

    const ticketData = {
        request: {
            requester: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.emailAddresses[0].emailAddress,
            },
            subject: data.subject,
            comment: {
                body: data.description,
            },
            type: data.type,
        }
    };

    let ticket;

    try {
        const response = await fetch(`${requestUrl}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Basic ${btoa(`${apiUsername}:${apiPassword}`)}`,
            },
            body: JSON.stringify(ticketData),
        })
        ticket = await response.json();
        // Purge the cache for all fetches tagged with 'tickets'
        revalidateTag('tickets');
    } catch (error) {
        return {
            error: "Failed to create ticket."
        }
    }
    
    return { data: ticket };

};

export const createTicket = createSafeAction(CreateTicket, handler);