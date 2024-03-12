import { ActivityList } from "@/components/activities/activity-list";
import { DashboardTitle } from "@/components/dashboard-title";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { currentGreeting } from "@/lib/current-greeting";
import { db } from "@/lib/db";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

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
        orderBy: {
            updatedAt: "desc",
        },
        take: 3,
    });

    const activities = await db.auditLog.findMany({
        where: {
            orgId: orgId!,
        },
        take: 10,
    });

    console.log(await checkSubscription(), "<-- checkSubscription result")

    return ( 
        <>
            <div className="text-3xl mb-8">{greeting}</div>
                <h3 className="text-2xl mb-4">Recently Active Sites</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sites.map((site) => (
                        <Card className="flex-grow">
                            <CardHeader className="flex flex-row items-start justify-start gap-4 space-y-0">
                                <Image 
                                    src={site.imageUrl!} 
                                    alt={site.name} 
                                    width={90} 
                                    height={60}
                                    className="rounded-md"
                                />
                                <div>
                                    <CardTitle>
                                        {site.name}
                                    </CardTitle>
                                    <CardDescription>
                                        {site.url}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                Site info
                            </CardContent>
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