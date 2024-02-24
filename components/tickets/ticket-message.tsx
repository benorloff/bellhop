interface CommentProps {
    id: number,
    type?: string,
    author_id: number,
    body: string,
    html_body?: string,
    plain_body?: string,
    public?: boolean,
    attachments: string[],
    audit_id?: number,
    via?: object,
    created_at: string,
    metadata?: object,
    name?: string,
};

export const TicketMessage = ({
    author_id,
    body,
    name,
    created_at,
    attachments,
}: CommentProps) => {

    return ( 
        <div className="w-full bg-card p-8 border rounded-sm mb-8">
            <div className="flex flex-row justify-between items-start gap-4 mb-8">
                <div>
                    <p>{name}</p>
                    <p className="text-sm">ID: {author_id}</p>
                </div>
                <div>{new Date(created_at).toLocaleString()}</div>
            </div>
            {body}
            {(attachments?.length! > 0) ? (
                <div>
                    {attachments?.length} Attachment(s)
                </div>
            ): (
                null
            )}
        </div>
     );
};