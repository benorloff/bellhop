"use server";

import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { currentProfile } from "@/lib/current-profile";

import { InputType, ReturnType } from "./types";
import { CreateSite } from "./schema";
import { MemberRole } from "@prisma/client";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { orgId, orgSlug } = auth();
    const profile = await currentProfile();

    if ( !orgId || !profile ) {
        return {
            error: "Unauthorized",
        };
    };

    const { name, slug, url, imageUrl, ipAddress } = data;

    let site;

    try {
        site = await db.site.create({
            data: {
                name,
                slug,
                url,
                imageUrl,
                profileId: profile.id,
                orgId,
                orgSlug,
                ipAddress,
                members: {
                    create: [
                        { profileId: profile.id, role: MemberRole.OWNER}
                    ]
                }
            }
        })
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to create site."
        }
    }

    return { data: site };
};

export const createSite = createSafeAction(CreateSite, handler);