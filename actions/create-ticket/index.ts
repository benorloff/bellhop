"use server";

import { auth, currentUser } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";

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
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
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
    // Create audit log for site creation
    auditLog = await createAuditLog({
      entityTitle: ticket.request.subject,
      entityId: ticket.request.id.toString(),
      entityType: EntityType.TICKET,
      action: Action.CREATE,
    });
} catch (error) {
    return {
      error: "Failed to create ticket.",
    };
  }

  return { data: { ticket, auditLog } };
};

export const createTicket = createSafeAction(CreateTicket, handler);
