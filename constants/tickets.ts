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

export const baseUrl = process.env.NEXT_PUBLIC_ZENDESK_API_TICKET_URL;
export const requestUrl = process.env.NEXT_PUBLIC_ZENDESK_API_REQUEST_URL;
export const userUrl = process.env.NEXT_PUBLIC_ZENDESK_API_USER_URL;
export const apiUsername = process.env.NEXT_PUBLIC_ZENDESK_USERNAME;
export const apiPassword = process.env.NEXT_PUBLIC_ZENDESK_PASSWORD;