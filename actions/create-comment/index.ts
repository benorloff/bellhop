"use server";

import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateComment } from "./schema";

import { requestUrl, apiPassword, apiUsername } from "@/constants/tickets";
import { currentProfile } from "@/lib/current-profile";


const handler = async (data: InputType): Promise<ReturnType> => {

    console.log(data, '<-- create comment data')

    const profile = await currentProfile();

    if (!profile) {
        return {
            error: "Unauthorized",
        };
    }

    const author_id = Number(String(profile.zendeskUserId));

    console.log(author_id, '<-- create comment author_id')


    const requestData = {
        request: {
            comment: {
                body: data.body,
                author_id: author_id,
            }
        } 
    }

    let request;

    try {
        const response = await fetch(`${requestUrl}/${data.request_id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${apiUsername}:${apiPassword}`)}`,
            },
            body: JSON.stringify(requestData),
        })
        const r  = await response.json();
        console.log(r, '<-- create comment response')
        request = r.request;
    } catch (error) {
        console.log(error, '<-- create comment error')
        return {
            error: "Failed to create comment."
        }
    }
    
    return { data: request };

};

export const createComment = createSafeAction(CreateComment, handler);