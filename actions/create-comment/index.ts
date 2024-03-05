"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CreateComment } from "./schema";

import { 
    zendeskApiHost, 
    zendeskApiPassword, 
    zendeskApiUsername 
} from "@/constants/tickets";
import { currentUser } from "@clerk/nextjs";


const handler = async (data: InputType): Promise<ReturnType> => {

    const user = await currentUser();

    if (!user) {
        return {
            error: "Unauthorized",
        };
    };

    const zendeskUserId = Number(String(user.privateMetadata?.zendeskUserId));

    if (!zendeskUserId) {
        return {
            error: "Unauthorized",
        };
    }

    const ticketData = {
        ticket: {
            comment: {
                body: data.body,
                author_id: zendeskUserId,
            }
        } 
    }

    let ticket;

    try {
        const response = await fetch(`${zendeskApiHost}/tickets/${data.ticket_id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${zendeskApiUsername}:${zendeskApiPassword}`)}`,
            },
            body: JSON.stringify(ticketData),
        })
        const r  = await response.json();
        ticket = r.ticket;
    } catch (error) {
        console.log(error, '<-- create comment error')
        return {
            error: "Failed to create comment."
        }
    }
    
    return { data: ticket };

};

export const createComment = createSafeAction(CreateComment, handler);