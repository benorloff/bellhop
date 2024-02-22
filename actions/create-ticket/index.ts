"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";


import { InputType, ReturnType } from "./types";
import { CreateTicket } from "./schema";


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
        name: `${user.firstName} ${user.lastName}`,
        subject: data.subject,
        email: user.emailAddresses[0].emailAddress,
        type: data.type,
        description: data.description,
        status: 2,
        priority: 2,
        source: 1,
    }

    let ticket;

    try {
        const response = await fetch("https://bellhop.freshdesk.com/api/v2/tickets",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_FRESHDESK_KEY}:x`)}`,
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