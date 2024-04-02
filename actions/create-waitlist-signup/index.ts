"use server"

import { createSafeAction } from "@/lib/create-safe-action";
import { InputType, ReturnType } from "./types";
import { CreateWaitlistSignup } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {

    const reqBody = {
        email: data.email,
        waitlist_id: 15158,
        referral_link: data.referral_link,
    }

    let signup;
    let waitlist; 

    try {
        const response = await fetch('https://api.getwaitlist.com/api/v1/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        });
        signup = await response.json();
    } catch (error) {
        return {
          error: "Failed to create waitlist signup.",
        };
    }

    try {
        const response = await fetch('https://api.getwaitlist.com/api/v1/waitlist?waitlist_id=15158');
        waitlist = await response.json();
    } catch (error) {
        return {
          error: "Failed to get waitlist.",
        };
    }

    return { data: { signup: {...signup}, waitlist: {...waitlist} } };
}

export const createWaitlistSignup = createSafeAction(CreateWaitlistSignup, handler);
