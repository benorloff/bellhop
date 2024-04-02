import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";

import { CreateWaitlistSignup } from "./schema";

export interface Signup {
    amount_referred: number,
    created_at: string,
    email: string,
    priority: number,
    referral_link: string,
    referral_token: string,
    referred_by_signup_token: string,
    removed_date?: string,
    removed_priority?: number,
    uuid: string,
    verified: string,
    waitlist_id: number,
}

export interface Waitlist {
    id: number,
    created_at: string,
    configuration_style_json: {
        widget_background_color: string,
        widget_button_color: string,
        widget_button_font_color: string,
        widget_font_color: string,
        border_color: string,
    },
    logo: string,
    spot_to_move_upon_referral: number,
    uses_firstname_lastname: boolean,
    uses_leaderboard: boolean,
    uses_signup_verification: boolean,
    waitlist_name: string,
    waitlist_url_location: string,
    statistics: {
        total_signups: number,
        current_signups: number,
    },
    title: string,
    required_contact_detail: string,
    widget_shows_social_links: boolean,
    signup_button_title: string,
    questions: {
        question_value: string,
        optional: boolean,
        answer_value?: string,
    }[],
    uses_zapier: boolean,
    uses_waitlist_widget_branding: boolean,
    email_configuration_json: object,
    twitter_message: string,
    send_email_congratulations_on_referral: boolean,
    organization_uuid_fk: string,
    hide_counts: boolean,
    leaderboard_length: number,
    remove_widget_headers: boolean,
}

export type SignupWaitlist = { 
    signup: Signup,
    waitlist: Waitlist,
};

export type InputType = z.infer<typeof CreateWaitlistSignup>;
export type ReturnType = ActionState<InputType, SignupWaitlist>;