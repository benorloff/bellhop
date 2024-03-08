"use server";

import { auth, clerkClient, currentUser } from "@clerk/nextjs";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";

import { CreateSiteInvite } from "./schema";
import { InputType, ReturnType } from "./types";

import { sendgridApiHost, sendgridApiKey } from "@/constants/mail";
import { createAuditLog } from "@/lib/create-audit-log";
import { Action, EntityType } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();
  const { orgId, orgSlug } = auth();
  const { email, siteId, siteName } = data;

  if (!user || !orgId) {
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

  let org;
  let orgMemberList;

  try {
    org = await clerkClient.organizations.getOrganization({
      organizationId: orgId,
    });
    orgMemberList = await clerkClient.organizations.getOrganizationMembershipList({
      organizationId: orgId,
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to get organization.",
    };
  }

  if (orgMemberList.values.length === org.maxAllowedMemberships || orgMemberList.values.length > org.maxAllowedMemberships) {
    return {
      error: "Organization has reached the maximum number of members.",
    };
  }

  let invite;

  try {
    invite = await db.invite.create({
      data: {
        userId: user.id,
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

  try {
    await createAuditLog({
        orgId,
        siteId: siteId,
        action: Action.UPDATE,
        entityId: invite.id,
        entityType: EntityType.SITE,
        entityTitle: email,
        userId: user.id,
        userImage: user.imageUrl,
        userName: `${user.firstName} ${user.lastName}`,
    })
} catch (error) {
    console.log(error);
    return {
        error: "Failed to create audit log for site invite."
    }
}

  // Add redirect/revalidate to site page here?

  return { data: invite };
};

export const createSiteInvite = createSafeAction(CreateSiteInvite, handler);
