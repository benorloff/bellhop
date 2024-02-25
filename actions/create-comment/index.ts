"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { currentProfile } from "@/lib/current-profile";

import { InputType, ReturnType } from "./types";
import { CreateComment } from "./schema";

import { 
    zendeskApiHost, 
    zendeskApiPassword, 
    zendeskApiUsername 
} from "@/constants/tickets";


const handler = async (data: InputType): Promise<ReturnType> => {

    const profile = await currentProfile();

    if (!profile) {
        return {
            error: "Unauthorized",
        };
    }

    const author_id = Number(String(profile.zendeskUserId));

    const ticketData = {
        ticket: {
            comment: {
                body: data.body,
                author_id: author_id,
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