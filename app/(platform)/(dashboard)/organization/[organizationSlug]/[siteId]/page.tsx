import { currentProfile } from "@/lib/current-profile";

import { Badge } from "@/components/ui/badge";
import { 
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { InviteButton } from "../_components/invite-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

import { TICKET_STATUS } from "@/constants/tickets";

import { 
    zendeskApiHost,
    zendeskApiPassword,
    zendeskApiUsername, 
} from "@/constants/tickets";
import { getSite } from "@/lib/get-site";
import { auth } from "@clerk/nextjs";

interface SiteIdPageProps {
    params: {
        siteId: string;
    };
};

const SiteIdPage = async ({
    params,
}: SiteIdPageProps) => {
    const { userId } = auth();

    const profile = await currentProfile(userId as string);

    if (!profile) {
        throw new Error ("Profile not found");
    }

    const site = await getSite(params.siteId);

    const query = new URLSearchParams({
        query: `type:ticket custom_field_23229752282907:${site?.id}`,
        sort_by: "updated_at",
        sort_order: "desc",
    });

    const getSiteTickets = async () => {

        let tickets;

        try {
            const response = await fetch(`${zendeskApiHost}/search?${query}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Basic ${btoa(`${zendeskApiUsername}:${zendeskApiPassword}`)}`,
                }, 
            });
            tickets = await response.json();
        } catch (error) {
            return {
                error: "Failed to get site tickets."
            }
        }


        return tickets;
    };

    const tickets = await getSiteTickets();
    
    return (
        <div>
            <div className="flex flex-row flex-wrap gap-8">
                <div className="flex flex-col basis-full lg:basis-7/12 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Tickets</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Render the 3 most recent tickets */}
                            {tickets.results.map((ticket: any, index: number) => {
                                if ( index < 3 ) {
                                    return (
                                        <Link href={`/tickets/${ticket.id}`} key={ticket.id}>
                                            <div className="flex flex-row gap-4 justify-between border rounded-sm bg-background hover:bg-background/90 p-4 mb-4">
                                                <Badge variant="open">{`${ticket.status.charAt(0).toUpperCase()}${ticket.status.slice(1)}`}</Badge>
                                                <div className="grow">{ticket.subject}</div>
                                                <div className="shrink">{new Date(ticket.updated_at).toLocaleString()}</div>
                                            </div>
                                        </Link>
                                    )
                                }
                            })}     
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-col grow basis-auto gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                {site?.members.map((member) => (
                                    <div key={member.id} className="flex flex-row justify-between items-center gap-4">
                                        <Avatar>
                                            {/* Change this to next/image */}
                                            <AvatarImage src={member.profile.imageUrl} alt={member.profile.firstName} />
                                            <AvatarFallback>BO</AvatarFallback>
                                        </Avatar>
                                        <div className="grow">
                                            <div>{member.profile.firstName} {member.profile.lastName}</div>
                                        </div>
                                        <div className="shrink">{member.role}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <InviteButton siteId={params.siteId} profileId={profile.id}/>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>IP Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {site?.ipAddress}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SiteIdPage;