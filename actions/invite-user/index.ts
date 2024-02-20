"use server";

import { auth } from "@clerk/nextjs";

import { clerkClient } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { InviteUser } from "./schema";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { orgId } = auth();

    if ( !orgId ) {
        return {
            error: "Unauthorized",
        };
    };

    const { email } = data;

    let invitation;
    
    try {
        invitation = await clerkClient.invitations.createInvitation({
            emailAddress: email,
        })
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to invite user."
        }
    }

    // Add redirect/revalidate to site page here?

    return { data: invitation };
};

export const inviteUser = createSafeAction(InviteUser, handler);