"use server";

import { auth } from "@clerk/nextjs";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";

import { CreateSiteInvite } from "./schema";
import { InputType, ReturnType } from "./types";

import { sendgridApiHost, sendgridApiKey } from "@/constants/mail";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId, orgSlug } = auth();
  const { email, siteId, siteName } = data;

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  // Check to see if there's already an active invite for this recipient
  const existingInvite = await db.invite.findFirst({
    where: {
      recipientEmail: email,
      siteId: siteId,
      expiresAt: {
        gt: new Date(),
      },
    }
  });

  if (existingInvite) {
    return {
      error: `There is already a pending invite for ${email}`,
    };
  }

  let invite;

  try {
    invite = await db.invite.create({
      data: {
        userId: userId,
        recipientEmail: email,
        siteId: siteId,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create invitation.",
    };
  }

  const msg = {
    from: {
      email: "ben@circle.black",
    },
    personalizations: [
      {
        to: [
          {
            email: email,
          },
        ],
        dynamic_template_data: {
          site_name: siteName,
          url: `http://localhost:3000/organization/${orgSlug}/${siteId}/invite/${invite.id}`,
        },
      },
    ],
    template_id: "d-46448a712cc2427b9b485f0f4bf5043d",
  };

  let mail;

  try {
    mail = await fetch(`${sendgridApiHost}/mail/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sendgridApiKey}`,
      },
      body: JSON.stringify(msg),
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to send site invite email.",
    };
  }

  // Add redirect/revalidate to site page here?

  return { data: invite };
};

export const createSiteInvite = createSafeAction(CreateSiteInvite, handler);
