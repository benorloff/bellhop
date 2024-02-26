"use server";

import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateSiteInvite } from "./schema";

import { sendgridApiHost, sendgridApiKey } from "@/constants/mail";

// Clerk Organization Invitations API Reference
// https://clerk.com/docs/reference/backend-api/tag/Organization-Invitations

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    const { email, site, profile } = data;


    if ( !userId || !orgId ) {
        return {
            error: "Unauthorized",
        };
    };

    let invite;

    try {
        invite = await db.invite.create({
            data: {
                recipientEmail: email,
                siteId: site.id,
                profileId: profile.id,
            }
        })
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to create invitation."
        }
    }

    const msg = {
        from: {
            email: "ben@circle.black"
        },
        personalizations: [
            {
                to: [
                    {
                        email: email
                    }
                ],
                dynamic_template_data: {
                    site_name: "Circle Black",
                    url: `http://localhost:3000/organization/test-org/${site.id}/invite/${invite.id}`
                }
            }
        ],
        template_id: "d-46448a712cc2427b9b485f0f4bf5043d"
    }

    // TODO: Check if user already exists in the app before sending invitation

    let mail;
    
    try {
        mail = await fetch(`${sendgridApiHost}/mail/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sendgridApiKey}`,
            },
            body: JSON.stringify(msg),
        })
        // mail = await sgMail.send(msg);

    } catch (error) {
        console.log(error);
        return {
            error: "Failed to send site invite email."
        }
    }

    // Add redirect/revalidate to site page here?

    return { data: invite };
};

export const createSiteInvite = createSafeAction(CreateSiteInvite, handler);