import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
    user: {
        id: string,
        name: string,
        email: string,
        photo: {
            content_url: string,
        },
    }
};

export const TicketMessage = ({
    author_id,
    body,
    user,
    created_at,
    attachments,
}: CommentProps) => {
    
    return ( 
        <div className="w-full bg-card p-8 border rounded-sm mb-8">
            <div className="flex flex-row justify-between items-start gap-4 mb-8">
                <div className="flex flex-row gap-2 items-center">
                    <Avatar>
                        <AvatarImage src={user.photo?.content_url} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p>{user.name}</p>
                        <p className="text-sm">{user.email}</p>
                    </div>
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