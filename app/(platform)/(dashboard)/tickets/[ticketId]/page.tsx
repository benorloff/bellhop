interface TicketIdPageProps {
    params: {
        ticketId: string;
    };
};

interface ConversationProps {
    body_text: string;
    body: string;
    id: number;
    incoming: boolean;
    private: boolean;
    user_id: number;
    support_email?: string;
    source: number;
    ticket_id: number;
    created_at: string;
    updated_at: string;
    from_email?: string;
    to_emails?: string[];
    cc_emails?: string[];
    bcc_emails?: string[];
    attachments?: [];
    last_edited_at?: string;
    last_edited_user_id?: number;
}

async function getTicket({ params 
}: TicketIdPageProps) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRESHDESK_API_URL}/${params.ticketId}?include=conversations`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_FRESHDESK_KEY}:x`)}`,
        }
    })
    const data = await res.json();

    return data;
}

async function getTicketConversations({ params 
}: TicketIdPageProps) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRESHDESK_API_URL}/${params.ticketId}/conversations`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_FRESHDESK_KEY}:x`)}`,
        }
    })
    const data = await res.json();

    return data;
}

const TicketIdPage =  async ({
    params
}: TicketIdPageProps) => {

    const ticket = await getTicket({ params });
    const conversations = await getTicketConversations({ params });
    
    return (
        <div>
            <div className="text-3xl mb-8">{ticket.subject}</div>
            <div>Ticket #: {ticket.id}</div>
            <div>Status: {ticket.status}</div>
            <div>Description: {ticket.description_text}</div>
            { conversations.length ? 
                <>
                    {conversations.map((conversation: ConversationProps) => (
                        <div key={conversation.id} className="pt-8 pb-8">
                            <div>User ID: {conversation.user_id}</div>
                            <div>Created At: {conversation.created_at}</div>
                            {conversation.body_text}
                        </div>
                    ))}
                </>
                : 
                <div className="pt-8 pb-8">No conversations yet.</div>
            }
        </div>
    );
};

export default TicketIdPage;