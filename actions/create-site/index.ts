"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { currentProfile } from "@/lib/current-profile";

import { InputType, ReturnType } from "./types";
import { CreateSite } from "./schema";
import { MemberRole } from "@prisma/client";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { orgId } = auth();
    const profile = await currentProfile();

    if ( !orgId ) {
        return {
            error: "Unauthorized",
        };
    };

    const { name, slug, url, ipAddress } = data;

    let site;

    try {
        site = await db.site.create({
            data: {
                name,
                slug,
                url,
                profileId: profile!.id,
                orgId,
                ipAddress,
                members: {
                    create: [
                        { profileId: profile!.id, role: MemberRole.OWNER}
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

    revalidatePath(`/site/${site.slug}`);
    return { data: site };
};

export const createSite = createSafeAction(CreateSite, handler);