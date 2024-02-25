import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

import { db } from '@/lib/db'

import { 
    zendeskApiHost, 
    zendeskApiPassword, 
    zendeskApiUsername 
} from '@/constants/tickets'

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Clerk webhook secret not set')
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, return a 400
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response(`Error: missing svix headers ${svix_id}`, { 
            status: 400 
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create new Svix instance with secret
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook', err);
        return new Response('Error: Invalid svix signature', {
            status: 400
        });
    }

    const eventType = evt.type;

    // Create a profile when a user is created in Clerk
    if (eventType === "user.created") {



        // Define the user properties for Zendesk
        const zendeskUser = {
            user: {
                name: `${payload.data.first_name} ${payload.data.last_name}`,
                email: payload.data.email_addresses[0].email_address,
                role: 'end-user',
                remote_photo_url: payload.data.image_url,
                skip_verify_email: true,
            }
        }

        // Create the user in Zendesk
        const res = await fetch(`${zendeskApiHost}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${zendeskApiUsername}:${zendeskApiPassword}`)}`,
            }, 
            body: JSON.stringify(zendeskUser)
        }); 

        const { user } = await res.json();


        await db.profile.create({
            data: {
                userId: payload.data.id,
                zendeskUserId: user.id,
                firstName: payload.data.first_name,
                lastName: payload.data.last_name,
                imageUrl: payload.data.image_url,
                email: payload.data.email_addresses[0].email_address,
            },
        });
    }

    // Update profile when a user is updated in Clerk
    if (eventType === "user.updated") {
        await db.profile.update({
            where: {
                userId: payload.data.id,
            },
            data: {
                firstName: payload.data.first_name,
                lastName: payload.data.last_name,
                imageUrl: payload.data.image_url,
                email: payload.data.email_addresses[0].email_address,
            },
        });
    }

    // Delete profile when a user is deleted in Clerk
    if (eventType === "user.deleted") {
        await db.profile.delete({
            where: {
                userId: payload.data.id,
            },
        });
    }

    return new Response('', { status: 200 });
};