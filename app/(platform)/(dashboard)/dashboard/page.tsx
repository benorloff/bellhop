import { DashboardTitle } from "@/components/dashboard-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentGreeting } from "@/lib/current-greeting";
import { db } from "@/lib/db";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";

const DashboardPage = async () => {

    const { userId } = auth();

    const greeting = await currentGreeting();

    const sites = await db.site.findMany({
        where: {
            members: {
                some: 
                {
                    userId: userId!,
                }
            }
        }
    });

    console.log(await checkSubscription(), "<-- checkSubscription result")

    return ( 
        <>
            <div className="text-3xl mb-8">{greeting}</div>
            <div className="flex flex-row flex-wrap gap-4">
                {sites.map((site) => (
                    <div key={site.id} className="min-w-[300px]">
                        <Card>
                            <CardHeader>{site.name}</CardHeader>
                            <CardContent>{site.url}</CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </>
     );
}
 
export default DashboardPage;