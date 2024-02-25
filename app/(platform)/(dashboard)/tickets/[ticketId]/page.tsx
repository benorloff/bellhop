import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TicketMessage } from "@/components/tickets/ticket-message";
import { Separator } from "@/components/ui/separator";
import { TicketReplyPanel } from "@/components/tickets/ticket-reply-panel";
import { 
    zendeskApiHost, 
    zendeskApiPassword, 
    zendeskApiUsername 
} from "@/constants/tickets";

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
    attachments: string[],
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

    const ticket = await getTicket({ params });
    const comments = await getTicketComments({ params });
    
    return (
        <>
            <div>
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
            { comments.comments.length ? 
                <>
                    {comments.comments.map((comment: CommentProps) => (
                        <TicketMessage 
                            key={comment.id}
                            id={comment.id}
                            author_id={comment.author_id}
                            name={comments.users.find((user: any) => user.id === comment.author_id).name}
                            body={comment.body} 
                            created_at={comment.created_at}
                            attachments={comment.attachments}
                        />
                    ))}
                </>
                : 
                <div className="pt-8 pb-8">No comments yet.</div>
            }
            <TicketReplyPanel />
        </>
    );
};

export default TicketIdPage;