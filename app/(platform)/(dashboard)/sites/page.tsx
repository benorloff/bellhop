import { Suspense } from "react";
import { SiteList } from "../../../../components/sites/site-list";
import { DashboardTitle } from "@/components/dashboard-title";
import { CreateSiteButton } from "@/components/sites/create-site-button";

const SitesPage = () => {
    return ( 
        <>
            <div className="flex justify-between items-start">
                <DashboardTitle/>
                <CreateSiteButton />
            </div>
            <Suspense fallback={<SiteList.Skeleton />}>
                <SiteList />
            </Suspense>
        </>
     );
}
 
export default SitesPage;