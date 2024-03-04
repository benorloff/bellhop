import { Suspense } from "react";
import { SiteList } from "../../../../components/sites/site-list";
import { DashboardTitle } from "@/components/dashboard-title";

const SitesPage = () => {
    return ( 
        <>
            <DashboardTitle title="Sites" />
            <Suspense fallback={<SiteList.Skeleton />}>
                <SiteList />
            </Suspense>
        </>
     );
}
 
export default SitesPage;