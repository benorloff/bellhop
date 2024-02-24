import { db } from "@/lib/db";

import { Button } from "@/components/ui/button";
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
import { SiteImage } from "@/components/sites/site-image";

interface SiteIdPageProps {
    params: {
        siteId: string;
    };
};

const SiteIdPage = async ({
    params,
}: SiteIdPageProps) => {

    const site = await db.site.findUnique({
        where: {
            id: params.siteId,
        },
        include: {
            members: {
                include: {
                    profile: true,
                },
            },
        }
    });

    const getSiteTickets = async () => {
        const response = await fetch(`https://bellhop.freshdesk.com/api/v2/search/tickets?query="custom_string:'${site?.id}'"`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${process.env.NEXT_PUBLIC_FRESHDESK_KEY}:x`)}`,
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        };

        return response.json();
    };

    const tickets = await getSiteTickets();
    
    return (
        <div>
            <div className="flex flex-row items-center gap-8 mb-8">
                <div className="shrink">
                    <SiteImage 
                        siteId={site?.id as string}
                        imageUrl={site?.imageUrl as string} 
                        siteName={site?.name as string} 
                    />
                </div>
                <div className="grow">
                    <div className="text-3xl">{site?.name}</div>
                    <div>{site?.url}</div>
                </div>
            </div>
            {/* Menu placeholder. Need to abstract. */}
            <div className="flex flex-row gap-8 mb-8">
                <div>Overview</div>
                <div>Tickets</div>
                <div>Team</div>
                <div>Settings</div>
            </div>
            <div className="flex flex-row flex-wrap gap-8">
                <div className="flex flex-col basis-full lg:basis-7/12 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Tickets</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {tickets.results.map((ticket: any) => (
                                <Link href={`/tickets/${ticket.id}`} key={ticket.id}>
                                    <div className="flex flex-row gap-4 justify-between border rounded-sm bg-background hover:bg-background/90 p-4 mb-4">
                                        <Badge variant="open">{TICKET_STATUS[ticket.status as keyof typeof TICKET_STATUS]}</Badge>
                                        <div className="grow">{ticket.subject}</div>
                                        <div className="shrink">{new Date(ticket.updated_at).toLocaleString()}</div>
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Button>
                                View all tickets
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                <div className="flex flex-col grow basis-auto gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {site?.members.map((member) => (
                                <div key={member.id} className="flex flex-row justify-between items-center gap-4">
                                    <Avatar>
                                        {/* Change this to next/image */}
                                        <AvatarImage src={member.profile.imageUrl} alt={member.profile.firstName} />
                                        <AvatarFallback>BO</AvatarFallback>
                                    </Avatar>
                                    <div className="grow">
                                        <div>{member.profile.firstName} {member.profile.lastName}</div>
                                        <div className="text-sm">{member.profile.email}</div>
                                    </div>
                                    <div className="shrink">{member.role}</div>
                                </div>
                            
                            ))}
                        </CardContent>
                        <CardFooter>
                            <InviteButton />
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