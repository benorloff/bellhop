import { EntityType, AuditLog } from "@prisma/client";
import { auth } from "@clerk/nextjs";

import { currentProfile } from "@/lib/current-profile";
import { getSite } from "@/lib/get-site";
import { db } from "@/lib/db";

import { ActivityList } from "@/components/activities/activity-list";
import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar";
import { 
    Card, 
    CardContent, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { InviteButton } from "../_components/invite-button";

import {
    dataCenters
} from "@/constants/sites";
import { Hint } from "@/components/hint";
import Image from "next/image";
import { RecentTickets } from "@/components/tickets/recent-tickets";
import { Suspense } from "react";

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

    const activities = await db.auditLog.findMany({
        where: {
            entityType: EntityType.SITE,
            entityId: site?.id,
        }
    });
    
    return (
        <div>
            <div className="flex flex-row flex-wrap gap-8">
                <div className="flex flex-col basis-full lg:basis-7/12 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Tickets</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Suspense fallback={<RecentTickets.Skeleton />}>
                                <RecentTickets requestType="site" siteId={params.siteId} />
                            </Suspense>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ActivityList activities={activities as AuditLog[]} />
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
                                            <AvatarFallback>{`${member.profile.firstName[0]}${member.profile.lastName[0]}`}</AvatarFallback>
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
                            <div className="flex flex-row items-center gap-4">
                                <Hint
                                    label={dataCenters[site?.dataCenter!].label}
                                    side="top"
                                >
                                    <Image
                                        src={dataCenters[site?.dataCenter!].iconPath}
                                        alt={dataCenters[site?.dataCenter!].label}
                                        width={36}
                                        height={36}
                                        className="rounded-sm"
                                    />
                                </Hint>
                                <div className="grow">
                                    {site?.ipAddress}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SiteIdPage;