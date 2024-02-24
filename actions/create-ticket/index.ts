"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";


import { InputType, ReturnType } from "./types";
import { CreateTicket } from "./schema";

import { requestUrl, apiPassword, apiUsername } from "@/constants/tickets";

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
            custom_fields: [
                {
                    id: 23229752282907,
                    value: data.siteId,
                },
                {
                    id: 23229761862043,
                    value: data.siteName,
                },
                {
                    id: 23229762482843,
                    value: data.siteUrl,
                }
            ]
        }
    };

    console.log(ticketData, 'ticketData')
    console.log(ticketData.request.custom_fields, 'ticketData.request.custom_fields')

    let ticket;

    try {
        const response = await fetch(`${requestUrl}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${apiUsername}:${apiPassword}`)}`,
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