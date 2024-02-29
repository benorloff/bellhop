import { db } from "@/lib/db";

export const currentProfile = async (
    userId: string
) => {

    const profile = await db.profile.findUnique({
        where: {
            userId,
        },
    });

    return profile;
}