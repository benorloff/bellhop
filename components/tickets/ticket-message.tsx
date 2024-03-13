import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { TicketAttachment } from "./ticket-attachment";

interface AttachmentProps {
    id: number,
    file_name: string;
    content_url: string;
};

interface CommentProps {
    id: number,
    type?: string,
    author_id: number,
    body: string,
    html_body?: string,
    plain_body?: string,
    public?: boolean,
    attachments: AttachmentProps[],
    audit_id?: number,
    via?: object,
    created_at: string,
    metadata?: object,
    name?: string,
    user: {
        id: string,
        name: string,
        email: string,
        role: string;
        photo: {
            content_url: string,
        },
    }
};

export const TicketMessage = async ({
    author_id,
    body,
    user,
    created_at,
    attachments,
}: CommentProps) => {

    let url;

    // Zendesk Uploads API returns an ArrayBufer,
    // so we need to decode and parse it to get the image source URL
    const imagePreview = async (content_url: string) => {
        // Fetch the content_url provided by Zendesk
        let response = await fetch(String(content_url));
        // Handle errors
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Convert the response to an ArrayBuffer
        let data = await response.arrayBuffer();
        // Convert the ArrayBuffer to a Uint8Array
        let uint8Array = new Uint8Array(data);
        // Decode the Uint8Array to a string, then parse it to JSON
        let decoded = await JSON.parse(new TextDecoder().decode(uint8Array));
        // Zendesk sometimes returns the content_url property directly, 
        // but sometimes it is nested inside an upload object
        // Check for both cases and return the content_url
        let url = decoded.content_url || decoded.upload.content_url;
        return url;
    }
    
    return ( 
        <div className="flex flex-col w-full bg-card p-8 border rounded-sm gap-8 mb-8">
            <div className="flex flex-row justify-between items-start">
                <div className="flex flex-row gap-2 items-center">
                    <Avatar>
                        <AvatarImage src={user.photo?.content_url} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex flex-row items-center gap-2">
                            <p>{user.name}</p>
                            {user.role !== "end-user" && (
                                <Badge className="text-xs">{user.role.toUpperCase()}</Badge>
                            )}
                        </div>
                        <p className="text-sm">{user.email}</p>
                    </div>
                </div>
                <div>{new Date(created_at).toLocaleString()}</div>
            </div>
            {body}
            {(attachments?.length! > 0) && (
                <div className="space-y-2">
                    <Separator />
                    <p>Attachments:</p>
                    {attachments.map( async (attachment) => {
                        url = await imagePreview(attachment.content_url);
                        return (
                            <TicketAttachment 
                                key={attachment.id}
                                name={attachment.file_name}
                                url={url}
                            />
                        )
                    })}
                </div>
            )}
        </div>
     );
};