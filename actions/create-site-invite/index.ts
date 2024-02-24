"use server";

import { auth } from "@clerk/nextjs";

import sgMail from "@sendgrid/mail";

import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateSiteInvite } from "./schema";

// Clerk Organization Invitations API Reference
// https://clerk.com/docs/reference/backend-api/tag/Organization-Invitations

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if ( !userId || !orgId ) {
        return {
            error: "Unauthorized",
        };
    };

    const { email } = data;

    const msg = {
        to: email,
        from: "ben@circle.black",
        templateId: "d-46448a712cc2427b9b485f0f4bf5043d",
        dynamicTemplateData: {
            site_name: "Circle Black",
        },
    }

    sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

    // TODO: Check if user already exists in the app before sending invitation
    
    try {
        await sgMail.send(msg);
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to invite user."
        }
    }

    // Add redirect/revalidate to site page here?

    return { data: msg };
};

export const createSiteInvite = createSafeAction(CreateSiteInvite, handler);