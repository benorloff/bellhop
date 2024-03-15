"use server"

import { currentUser } from "@clerk/nextjs";

export async function getUser() {
    const user = await currentUser();

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};