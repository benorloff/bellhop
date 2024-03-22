import { ActivityList } from "@/components/activities/activity-list";
import { DashboardTitle } from "@/components/dashboard-title";
import { AvatarGroup } from "@/components/sites/avatar-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { currentGreeting } from "@/lib/current-greeting";
import { db } from "@/lib/db";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const DashboardPage = async () => {

    const { userId, orgId } = auth();

    const greeting = await currentGreeting();

    const sites = await db.site.findMany({
        where: {
            members: {
                some: 
                {
                    userId: userId!,
                }
            }
        },
        include: {
            members: true,
        },
        orderBy: {
            updatedAt: "desc",
        },
        take: 3,
    });

    const activities = await db.auditLog.findMany({
        where: {
            orgId: orgId!,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
    });

    return ( 
        <>
            <div className="text-3xl mb-8">{greeting}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sites.map((site) => (
                        <Card key={site.id} className="flex flex-grow flex-col justify-between">
                            <CardHeader className="flex flex-row items-center justify-start gap-4 space-y-0">
                                <Image 
                                    src={site.imageUrl!} 
                                    alt={site.name} 
                                    width={60} 
                                    height={40}
                                    className="rounded-md"
                                />
                                <div>
                                    <CardTitle className="line-clamp-1 leading-tight">
                                        {site.name}
                                    </CardTitle>
                                    <CardDescription>
                                        {site.url}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="h-max space-y-4">
                                {/* Placeholder data for site stats */}
                                <div>
                                    <span className="text-sm text-muted-foreground">Site visits</span>
                                    <Progress value={33} />
                                </div>
                                <div>
                                    <span className="text-sm text-muted-foreground">Bandwidth</span>
                                    <Progress value={85} />
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-row justify-between items-center">
                                <AvatarGroup members={site.members} />
                                <Link href={`/organization/${site.orgSlug}/${site.id}`}>
                                    <Button variant="secondary">
                                        Manage
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            <div className="flex flew-row w-full gap-4 my-4">
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>
                            Title
                        </CardTitle>
                        <CardDescription>
                            Description
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>{greeting}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Activity
                        </CardTitle>
                        <CardDescription>
                            Your team's recent activity.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ActivityList activities={activities} />
                    </CardContent>
                </Card>
            </div>
        </>
     );
}
 
export default DashboardPage;