"use server";

import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateComment } from "./schema";

import { baseUrl, apiPassword, apiUsername } from "@/constants/tickets";
import { currentProfile } from "@/lib/current-profile";


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
        const response = await fetch(`${baseUrl}/${data.ticket_id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${apiUsername}:${apiPassword}`)}`,
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