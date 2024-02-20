"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

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

    const { 
        name,
        email,
        subject,
        type,
        status,
        priority,
        description,
        source, 
    } = data;

    let ticket;

    try {
        const response = await fetch("https://bellhop.freshdesk.com/api/v2/tickets",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_FRESHDESK_KEY}:x`)}`,
            },
            body: JSON.stringify(data),
        })
        ticket = await response.json();
    } catch (error) {
        return {
            error: "Failed to create ticket."
        }
    }
    

    // revalidatePath(`/site/${site.slug}`);
    return { data: ticket };
};

export const createTicket = createSafeAction(CreateTicket, handler);