"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath, revalidateTag } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";

import { CreateTicket } from "./schema";
import { InputType, ReturnType } from "./types";

import {
    zendeskApiHost,
    zendeskApiPassword,
    zendeskApiUsername,
} from "@/constants/tickets";
import { createAuditLog } from "@/lib/create-audit-log";
import { Action, EntityType } from "@prisma/client";

// Zendesk Requests API Reference
// https://developer.zendesk.com/api-reference/ticketing/tickets/ticket-requests/#create-request

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId } = auth();

  if (!orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const user = await currentUser();

  if (!user) {
    return {
      error: "User not found",
    };
  }

  const ticketData = {
    request: {
      requester: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0].emailAddress,
      },
      subject: data.subject,
      comment: {
        body: data.description,
      },
      custom_fields: [
        {
          id: 23229752282907,
          value: data.siteId,
        },
        {
          id: 23229761862043,
          value: data.siteName,
        },
        {
          id: 23229762482843,
          value: data.siteUrl,
        },
      ],
    },
  };

  let ticket;
  let auditLog;

  try {
    const response = await fetch(`${zendeskApiHost}/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(
          `${zendeskApiUsername}:${zendeskApiPassword}`
        )}`,
      },
      body: JSON.stringify(ticketData),
    });
    ticket = await response.json();
    // Purge the cache for all fetches tagged with 'tickets'
    revalidateTag("tickets");
} catch (error) {
    return {
      error: "Failed to create ticket.",
    };
  }

  try {
    await createAuditLog({
      orgId,
      siteId: data.siteId,
      action: Action.CREATE,
      // Convert ticket id from bigint to string
      entityId: ticket.request.id.toString(),
      entityType: EntityType.TICKET,
      entityTitle: ticket.request.subject,
      userId: user.id,
      userImage: user.imageUrl,
      userName: `${user.firstName} ${user.lastName}`,
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create audit log for ticket creation.",
    };
  }

  return { data: { ticket, auditLog } };
};

export const createTicket = createSafeAction(CreateTicket, handler);
