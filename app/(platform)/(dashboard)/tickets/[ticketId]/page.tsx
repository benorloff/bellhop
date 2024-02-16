import { currentUser } from "@clerk/nextjs";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TICKET_STATUS } from "@/constants/tickets";
import { TicketMessage } from "@/components/tickets/ticket-message";
import { Separator } from "@/components/ui/separator";

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
        },
        // TODO: Is there a more efficient way to revalidate this data?
        cache: 'no-store'
    })
    const data = await res.json();

    return data;
}

export const TicketIdPage =  async ({
    params
}: TicketIdPageProps) => {

    const ticket = await getTicket({ params });
    const conversations = await getTicketConversations({ params });

    // Sort conversations by date in descending order
    const sortedConversations = conversations.sort((a: ConversationProps, b: ConversationProps) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const status = TICKET_STATUS[ticket.status as keyof typeof TICKET_STATUS];

    const user = await currentUser();
    
    return (
        <div>
            <div>
                <div className="text-3xl pb-4">{ticket.subject}</div>
                <div className="flex flex-row justify-start items-center gap-4">
                    <Badge>{status}</Badge>
                    <div>Ticket #: {ticket.id}</div>
                    <div>Site ID: {ticket.custom_fields.cf_site_id}</div>
                </div>
                <div className="flex flex-row items-start gap-4 mt-8">
                    <Avatar>
                        <AvatarImage src={user?.imageUrl} alt="Avatar"/>
                    </Avatar>
                    <div className="grow bg-white rounded-sm p-8 relative">
                        <div className="absolute top-[8px] left-[-12px] w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-r-[12px] border-r-white"></div>
                        <div className="flex flex-row gap-4 justify-between items-center mb-4">
                            <span className="font-bold">{user?.firstName} {user?.lastName}</span>
                            {new Date(ticket.created_at).toLocaleString()}
                        </div>
                        {ticket.description_text}
                    </div>
                </div>
            </div>
            <Separator className="mt-8 mb-8"/>
            { sortedConversations.length ? 
                <>
                    {sortedConversations.map((conversation: ConversationProps) => (
                        <TicketMessage key={conversation.id} message={conversation} />
                    ))}
                </>
                : 
                <div className="pt-8 pb-8">No conversations yet.</div>
            }
        </div>
    );
};

export default TicketIdPage;