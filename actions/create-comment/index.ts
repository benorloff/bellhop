"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CreateComment } from "./schema";

import { 
    zendeskApiHost, 
    zendeskApiPassword, 
    zendeskApiUsername 
} from "@/constants/tickets";
import { auth, currentUser } from "@clerk/nextjs";
import { createAuditLog } from "@/lib/create-audit-log";
import { Action, EntityType } from "@prisma/client";

interface TicketData {
    ticket: {
        comment: {
            body: string;
            author_id: number;
            uploads?: Array<string>;
        }
    }
}


const handler = async (data: InputType): Promise<ReturnType> => {

    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
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

    // TODO: Allow multiple files to be uploaded
    // If is a file attached to the comment, upload it to Zendesk
    let token;
    
    if (data.file) {
        const file = data.file;
        try {
            const response = await fetch(`${zendeskApiHost}/uploads?filename=${file.name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${zendeskApiUsername}:${zendeskApiPassword}`)}`,
                },
                body: JSON.stringify({
                    upload: {
                        content_url: file.url,
                        file_name: file.name,
                        size: file.size,
                    }
                })
            })
            const data = await response.json();
            token = data.upload.token;
        } catch (error) {
            console.log(error, '<-- upload error')
            return {
                error: "Failed to upload file."
            }
        }
    }
        
    const ticketData = {
        ticket: {
            comment: {
                body: data.body,
                author_id: zendeskUserId,
                uploads: [token],
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

    try {
        await createAuditLog({
            orgId,
            siteId: ticket.custom_fields.find(({ id }: { id: number }) => id === 23229752282907).value,
            action: Action.UPDATE,
            entityId: ticket.id.toString(),
            entityType: EntityType.TICKET,
            entityTitle: ticket.subject,
            userId: user.id,
            userImage: user.imageUrl,
            userName: `${user.firstName} ${user.lastName}`,
        })
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to create audit log for ticket update."
        }
    }
    return { data: ticket };
};

export const createComment = createSafeAction(CreateComment, handler);