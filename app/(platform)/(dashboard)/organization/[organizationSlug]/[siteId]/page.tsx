import { db } from "@/lib/db";
import { getSite } from "@/lib/get-site";

import { ActivityList } from "@/components/activities/activity-list";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { Hint } from "@/components/hint";
import { RecentTickets } from "@/components/tickets/recent-tickets";
import {
    dataCenters
} from "@/constants/sites";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SiteIdPageProps {
    params: {
        siteId: string;
    };
};

const SiteIdPage = async ({
    params,
}: SiteIdPageProps) => {

    const { orgId, orgSlug } = auth();
    const site = await getSite(params.siteId);

    if (!orgId) {
        redirect("/select-org");
    };

    if (!site) {
        notFound();
    };

    const activities = await db.auditLog.findMany({
        where: {
            siteId: site?.id,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 3,
    });
    
    return (
        <div>
            <div className="flex flex-row flex-wrap gap-8">
                <div className="flex flex-col basis-full lg:basis-7/12 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <div className="flex flex-row items-center justify-between">
                                    Recent Tickets
                                    <Link href={`/organization/${orgSlug}/${params.siteId}/tickets`}>
                                        <Button variant="outline">
                                            View All
                                        </Button>
                                    </Link>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Suspense fallback={<RecentTickets.Skeleton />}>
                                <RecentTickets requestType="site" siteId={params.siteId} />
                            </Suspense>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <div className="flex flex-row items-center justify-between">
                                    Recent Activity
                                    <Link href={`/organization/${orgSlug}/${params.siteId}/activity`}>
                                        <Button variant="outline">
                                            View All
                                        </Button>
                                    </Link>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Suspense fallback={<ActivityList.Skeleton />}>
                                <ActivityList activities={activities} />
                            </Suspense>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-col grow basis-auto gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <div className="flex flex-row items-center justify-between">
                                    Team
                                    <Link href={`/organization/${orgSlug}/${params.siteId}/team`}>
                                        <Button variant="outline">
                                            Manage
                                        </Button>
                                    </Link>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-4">
                                {site?.members.map((member) => (
                                    <div key={member.userId} className="flex flex-row justify-between items-center gap-4">
                                        <Avatar>
                                            {/* Change this to next/image */}
                                            <AvatarImage src={member.userImage} alt={member.userName} />
                                            <AvatarFallback>{member.userName[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="grow">
                                            <div>{member.userName}</div>
                                        </div>
                                        <div className="shrink">{member.role}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        {/* <CardFooter>
                            <InviteButton siteId={params.siteId} profileId={profile.id}/>
                        </CardFooter> */}
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