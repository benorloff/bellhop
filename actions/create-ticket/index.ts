"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateTicket } from "./schema";
import { redirect } from "next/navigation";


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

    console.log(data, "<-- data from create-ticket action")

    const response = await fetch("https://bellhop.freshdesk.com/api/v2/tickets",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_FRESHDESK_KEY}:X`)}`,
        },
        body: JSON.stringify(data),
    })
    
    if (!response.ok) {
        console.log(response, "<-- response from create-ticket action")
        return {
            error: "Failed to create ticket."
        }
    }

    // revalidatePath(`/site/${site.slug}`);
    return response.json();
};

export const createTicket = createSafeAction(CreateTicket, handler);