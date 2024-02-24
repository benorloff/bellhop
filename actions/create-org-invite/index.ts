"use server";

import { auth } from "@clerk/nextjs";

import { clerkClient } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateOrgInvite } from "./schema";

// Clerk Organization Invitations API Reference
// https://clerk.com/docs/reference/backend-api/tag/Organization-Invitations

const handler = async (data: InputType): Promise<ReturnType> => {
    const { orgId } = auth();

    if ( !orgId ) {
        return {
            error: "Unauthorized",
        };
    };

    const { email } = data;

    // TODO: Check if user already exists in the app before sending invitation

    let invitation;
    
    try {
        invitation = await clerkClient.invitations.createInvitation({
            emailAddress: email,
        })
        console.log(invitation, "<-- invitation response from Clerk");
    } catch (error) {
        console.log(error);
        // TODO: Add switch statement to handle different error codes
        // Example: if (error.code === "duplicate_record") { ... }
        return {
            error: "Failed to invite user."
        }
    }

    // Add redirect/revalidate to site page here?

    return invitation as ReturnType;
};

export const createOrgInvite = createSafeAction(CreateOrgInvite, handler);