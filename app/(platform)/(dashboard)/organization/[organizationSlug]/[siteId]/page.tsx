import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            <div className="mb-8">
                <div className="text-3xl">{site?.name}</div>
                <div>{site?.url}</div>
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
                            <CardTitle>Tickets</CardTitle>
                            <CardContent>list goes here</CardContent>
                        </CardHeader>
                    </Card>
                    <div className="bg-white rounded-sm p-4 shadow">
                        <div className="text-xl mb-4">Tickets</div>
                        {/* Ticket List component goes here. */}
                        {tickets.results.map((ticket: any) => (
                            <div key={ticket.id} className="flex flex-row gap-4 justify-between rounded-lg bg-[#FFFFFF] py-2">
                                <Badge>Status {ticket.status}</Badge>
                                <div className="grow">{ticket.subject}</div>
                                <div className="shrink">{new Date(ticket.updated_at).toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col grow basis-auto gap-8">
                    <div className="bg-white rounded-sm p-4 shadow">
                        <div className="text-xl mb-4">Team</div>
                    </div>
                    <div className="bg-white rounded-sm p-4 shadow">
                        <div className="text-xl mb-4">IP Address</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiteIdPage;