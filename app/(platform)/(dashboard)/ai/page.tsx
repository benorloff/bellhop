import { DashboardTitle } from "@/components/dashboard-title"
import { SiteSelect } from "@/components/sites/site-select";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

const AIPage = async () => {
    const { userId } = auth();

    const sites = await db.site.findMany({
        where: {
            members: {
                some: {
                    userId: userId!,
                }
            }
        }, 
        include: {
            members: true
        }
    })

    return(
        <>
            <DashboardTitle />
            <SiteSelect sites={sites} />
        </>
    )
};

export default AIPage;