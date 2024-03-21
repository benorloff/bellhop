import { DashboardTitle } from "@/components/dashboard-title";
import { TicketMessage } from "@/components/tickets/ticket-message";
import { TicketReplyPanel } from "@/components/tickets/ticket-reply-panel";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    zendeskApiHost,
    zendeskApiPassword,
    zendeskApiUsername
} from "@/constants/tickets";
import { currentUser } from "@clerk/nextjs";

interface TicketIdPageProps {
    params: {
        ticketId: string;
    };
};

interface CommentProps {
    id: number,
    type: string,
    author_id: number,
    body: string,
    html_body: string,
    plain_body: string,
    public: boolean,
    attachments: {
        id: number,
        file_name: string,
        content_url: string,
    }[],
    audit_id: number,
    via: object,
    created_at: string,
    metadata: object,
};

async function getTicket({ 
    params 
}: TicketIdPageProps) {
    const res = await fetch(`${zendeskApiHost}/tickets/${params.ticketId}?include=custom_statuses`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`${zendeskApiUsername}:${zendeskApiPassword}`)}`,
        }
    })
    const { ticket } = await res.json();

    return ticket;
}

async function getTicketComments({ 
    params 
}: TicketIdPageProps) {
    const res = await fetch(`${zendeskApiHost}/tickets/${params.ticketId}/comments?include=users&sort_by=updated_at&sort_order=desc`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`${zendeskApiUsername}:${zendeskApiPassword}`)}`,
        },
        // TODO: Is there a more efficient way to revalidate this data?
        cache: 'no-store'
    })
    const comments = await res.json();

    return comments;
}

export const TicketIdPage =  async ({
    params
}: TicketIdPageProps) => {

    // Get the current authenticated user
    const user = await currentUser();

    // Get the ticket from Zendesk
    const ticket = await getTicket({ params });
    
    // If the ticket is not found, return an error
    if (!ticket) {
        throw new Error('Ticket not found.')
    }

    // If the user is not the requester of the ticket, return an error
    if (ticket.requester_id !== user?.privateMetadata.zendeskUserId) {
        throw new Error('You are not authorized to view this ticket')
    }

    // Get the comments and users associated with this ticket
    const { comments, users } = await getTicketComments({ params });
    
    return (
        <>
            <div>
                <DashboardTitle title={`Ticket #${ticket?.id}`}/>
                <div className="text-3xl pb-4">{ticket?.subject}</div>
                <div className="flex flex-row justify-start items-center gap-4">
                    <Badge variant={ticket?.status}>
                        {/* Capitalize first letter of status */}
                        {`${ticket?.status.charAt(0).toUpperCase()}${ticket?.status.slice(1)}`}
                    </Badge>
                    <div>Ticket #: {ticket?.id}</div>
                    {/* <div>Site ID: {ticket.custom_fields.cf_site_id}</div> */}
                    <div>Created: {new Date(ticket?.created_at).toLocaleString()}</div>
                </div>
            </div>
            <Separator className="mt-8 mb-8"/>
            <div className="text-2xl pb-4">Ticket Activity</div>
            { comments ? 
                <>
                    {comments.map((comment: CommentProps) => (
                        <TicketMessage 
                            key={comment.id}
                            id={comment.id}
                            author_id={comment.author_id}
                            user={users.find((user: any) => user.id === comment.author_id)}
                            body={comment.body} 
                            created_at={comment.created_at}
                            attachments={comment.attachments}
                        />
                    ))}
                </>
                : 
                <div className="pt-8 pb-8">No comments yet.</div>
            }
            <TicketReplyPanel ticketStatus={ticket.status} />
        </>
    );
};

export default TicketIdPage;