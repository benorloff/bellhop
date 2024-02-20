interface TicketMessageProps {
    message: {
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
}

export const TicketMessage = ({
    message
}: TicketMessageProps) => {

    return ( 
        <div className="w-full bg-card p-8 rounded-sm mb-8">
            <div className="flex flex-row justify-between items-center gap-4 mb-8">
                <div>User ID: {message.user_id}</div>
                <div>{new Date(message.created_at).toLocaleString()}</div>
            </div>
            {message.body_text}
            {message.attachments?.length && (
                <div>
                    {message.attachments?.length} Attachment(s)
                </div>
            )}
        </div>
     );
};