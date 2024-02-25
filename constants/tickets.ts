export const TICKET_STATUS = {
    2: 'Open',
    3: 'Pending',
    4: 'Resolved',
    5: 'Closed',
};

export const TICKET_PRIORITY = {
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent',
};

export const TICKET_SOURCE = {
    1: 'Email',
    2: 'Portal',
    3: 'Phone',
    7: 'Chat',
    9: 'Feedback Widget',
    10: 'Outbound Email',
}

export const zendeskApiHost = process.env.ZENDESK_API_HOST;
export const zendeskApiUsername = process.env.ZENDESK_API_USERNAME;
export const zendeskApiPassword = process.env.ZENDESK_API_PASSWORD;